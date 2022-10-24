/*
 This file contains functions to sign message for executeRelayCall.
*/
import Account from 'eth-lib/lib/account';
import utils from 'web3-utils';
import { bufferToHex, keccak256 } from 'ethereumjs-util';

import { Message } from './interfaces';

export class EIP191Signer {
  hashEthereumSignedMessage(message: string) {
    const messageHex = utils.isHexStrict(message)
      ? message
      : utils.utf8ToHex(message);
    const messageBytes = utils.hexToBytes(messageHex);
    const messageBuffer = Buffer.from(messageBytes);
    const preamble =
      '\x19' + '\x45' + 'thereum Signed Message:\n' + messageBytes.length;
    const preambleBuffer = Buffer.from(preamble);
    const ethMessage = Buffer.concat([preambleBuffer, messageBuffer]);
    return bufferToHex(keccak256(ethMessage));
  }

  hashDataWithIntendedValidator(validatorAddress: string, data: string) {
    // validator address
    if (!utils.isAddress(validatorAddress))
      throw new Error('Validator needs to be a valid address');

    const validatorBuffer = Buffer.from(utils.hexToBytes(validatorAddress));
    // data to sign
    const dataHex = utils.isHexStrict(data) ? data : utils.utf8ToHex(data);
    const dataBuffer = Buffer.from(utils.hexToBytes(dataHex));

    // concatenate it
    const preambleBuffer = Buffer.from('\x19');
    const versionBuffer = Buffer.from('\x00');
    const ethMessage = Buffer.concat([
      preambleBuffer,
      versionBuffer,
      validatorBuffer,
      dataBuffer,
    ]);
    return bufferToHex(keccak256(ethMessage));
  }

  signEthereumSignedMessage(message: string, privateKey: string): Message {
    if (!privateKey.startsWith('0x')) {
      privateKey = '0x' + privateKey;
    }

    // 64 hex characters + hex-prefix
    if (privateKey.length !== 66) {
      throw new Error('Private key must be 32 bytes long');
    }

    const hash = this.hashEthereumSignedMessage(message);
    const signature = Account.sign(hash, privateKey);
    const vrs = Account.decodeSignature(signature);
    return {
      message: message,
      messageHash: hash,
      v: vrs[0],
      r: vrs[1],
      s: vrs[2],
      signature: signature,
    };
  }

  signDataWithIntendedValidator(
    validatorAddress: string,
    data: string,
    privateKey: string,
  ): Message {
    if (!privateKey.startsWith('0x')) {
      privateKey = '0x' + privateKey;
    }

    // 64 hex characters + hex-prefix
    if (privateKey.length !== 66) {
      throw new Error('Private key must be 32 bytes long');
    }
    const hash = this.hashDataWithIntendedValidator(validatorAddress, data);
    const signature = Account.sign(hash, privateKey);
    const vrs = Account.decodeSignature(signature);

    return {
      message: data,
      messageHash: hash,
      v: vrs[0],
      r: vrs[1],
      s: vrs[2],
      signature: signature,
    };
  }

  recover(message: string | Message, signature: string): string {
    if (!!message && typeof message === 'object') {
      return this.recover(
        message.messageHash,
        Account.encodeSignature([message.v, message.r, message.s]),
      );
    }
    return Account.recover(message, signature);
  }
}
