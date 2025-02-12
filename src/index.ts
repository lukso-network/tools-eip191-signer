/*
 This file contains functions to sign message for executeRelayCall.
*/
import {
  type Address,
  hexToBytes,
  isAddress,
  isHex,
  keccak256,
  recoverAddress,
  serializeSignature,
  stringToHex,
} from 'viem';
import { sign } from 'viem/accounts';

import type { Message } from './interfaces';
export class EIP191Signer {
  hashEthereumSignedMessage(message) {
    const messageHex = isHex(message) ? message : stringToHex(message);
    const messageBytes = hexToBytes(messageHex);
    const encoder = new TextEncoder();
    const preambleBytes = encoder.encode(
      `\x19\x45thereum Signed Message:\n${messageBytes.length}`,
    );
    const ethMessage = new Uint8Array(
      preambleBytes.length + messageBytes.length,
    );
    ethMessage.set(preambleBytes, 0); // Add the byte array starting at index 0
    ethMessage.set(messageBytes, preambleBytes.length); // Add the string bytes after
    return keccak256(ethMessage, 'hex');
  }
  hashDataWithIntendedValidator(validatorAddress, data) {
    // validator address
    if (!isAddress(validatorAddress)) {
      throw new Error('Validator needs to be a valid address');
    }
    const validatorBuffer = hexToBytes(validatorAddress);
    // data to sign
    const dataHex = isHex(data) ? data : stringToHex(data);
    const dataBuffer = hexToBytes(dataHex);
    // concatenate it
    const encoder = new TextEncoder();
    const preambleBuffer = encoder.encode('\x19\x00');
    const ethMessage = new Uint8Array(
      preambleBuffer.length + validatorBuffer.length + dataBuffer.length,
    );
    ethMessage.set(preambleBuffer, 0); // Add the byte array starting at index 0
    ethMessage.set(validatorBuffer, preambleBuffer.length); // Add the string bytes after
    ethMessage.set(dataBuffer, preambleBuffer.length + validatorBuffer.length); // Add the string bytes after
    return keccak256(ethMessage, 'hex');
  }

  async signEthereumSignedMessage(
    message: string,
    privateKey: `0x${string}`,
  ): Promise<Message> {
    const hash = this.hashEthereumSignedMessage(message);
    const signature = await sign({ hash, privateKey, to: 'object' });
    return {
      v: BigInt(0),
      ...signature,
      message: message,
      messageHash: hash,
      signature: serializeSignature(signature),
    };
  }

  async signDataWithIntendedValidator(
    validatorAddress: string,
    data: string,
    privateKey: `0x${string}`,
  ): Promise<Message> {
    const hash = this.hashDataWithIntendedValidator(validatorAddress, data);
    const signature = await sign({ hash, privateKey, to: 'object' });
    return {
      v: BigInt(0),
      ...signature,
      message: data,
      messageHash: hash,
      signature: serializeSignature(signature),
    };
  }

  async recover(
    messageHash: `0x${string}` | Message,
    signature: `0x${string}`,
  ): Promise<Address> {
    if (!!messageHash && typeof messageHash === 'object') {
      return this.recover(
        messageHash.messageHash,
        serializeSignature(messageHash),
      );
    }
    return await recoverAddress({
      hash: messageHash as `0x${string}`,
      signature,
    });
  }
}
