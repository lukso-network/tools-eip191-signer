/*
 This file contains functions to sign message for executeRelayCall.
*/
import Account from "eth-lib/lib/account";
import utils from "web3-utils";
import { bufferToHex, keccak256 } from "ethereumjs-util";
export class LSP6Signer {
  hashMessage(message) {
    var messageHex = utils.isHexStrict(message)
      ? message
      : utils.utf8ToHex(message);
    var messageBytes = utils.hexToBytes(messageHex);
    var messageBuffer = Buffer.from(messageBytes);
    var preamble = "\x19LSP6 Execute Relay Call:\n" + messageBytes.length;
    var preambleBuffer = Buffer.from(preamble);
    var ethMessage = Buffer.concat([preambleBuffer, messageBuffer]);
    return bufferToHex(keccak256(ethMessage));
  }

  sign(message, privateKey) {
    if (!privateKey.startsWith("0x")) {
      privateKey = "0x" + privateKey;
    }

    // 64 hex characters + hex-prefix
    if (privateKey.length !== 66) {
      throw new Error("Private key must be 32 bytes long");
    }

    var hash = this.hashMessage(message);
    var signature = Account.sign(hash, privateKey);
    var vrs = Account.decodeSignature(signature);
    return {
      message: message,
      messageHash: hash,
      v: vrs[0],
      r: vrs[1],
      s: vrs[2],
      signature: signature,
    };
  }

  recover(message, signature, isMessagePrefixed) {
    var args = [].slice.apply(arguments);
    // const args = arguments

    if (!!message && typeof message === "object") {
      const messageInfo = message;
      return this.recover(
        messageInfo.messageHash,
        Account.encodeSignature([messageInfo.v, messageInfo.r, messageInfo.s]),
        true
      );
    }

    if (!isMessagePrefixed) {
      message = this.hashMessage(message);
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
