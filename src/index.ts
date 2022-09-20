/*
 This file contains functions to sign message for executeRelayCall.
*/
import Account from "eth-lib/lib/account";
import utils from "web3-utils";
import { bufferToHex, keccak256 } from "ethereumjs-util";
import { Message } from "../src/interfaces";

export class LSP6Signer {
  hashMessage(message: string) {
    const messageHex = utils.isHexStrict(message)
      ? message
      : utils.utf8ToHex(message);
    const messageBytes = utils.hexToBytes(messageHex);
    const messageBuffer = Buffer.from(messageBytes);
    const preamble = "\x19LSP6 Execute Relay Call:\n" + messageBytes.length;
    const preambleBuffer = Buffer.from(preamble);
    const ethMessage = Buffer.concat([preambleBuffer, messageBuffer]);
    return bufferToHex(keccak256(ethMessage));
  }

  sign(message: string, privateKey: string): Message {
    if (!privateKey.startsWith("0x")) {
      privateKey = "0x" + privateKey;
    }

    // 64 hex characters + hex-prefix
    if (privateKey.length !== 66) {
      throw new Error("Private key must be 32 bytes long");
    }

    const hash = this.hashMessage(message);
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

  recover(
    message: string | Message,
    signature: string,
    isMessagePrefixed: boolean
  ): string {
    const args = [].slice.apply([message, signature, isMessagePrefixed]);

    if (!!message && typeof message === "object") {
      return this.recover(
        message.messageHash,
        Account.encodeSignature([message.v, message.r, message.s]),
        true
      );
    }

    if (!isMessagePrefixed) {
      message = this.hashMessage(message as string);
    }

    if (args.length >= 4) {
      isMessagePrefixed = args.slice(-1)[0];
      isMessagePrefixed =
        typeof isMessagePrefixed === "boolean" ? !!isMessagePrefixed : false;

      return this.recover(
        message,
        Account.encodeSignature(args.slice(1, 4)),
        isMessagePrefixed
      );
    }
    return Account.recover(message, signature);
  }
}
