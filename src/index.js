/*
 This file contains functions to sign message for executeRelayCall.
*/

Accounts.prototype.hashMessage = function hashMessage(data) {
    var messageHex = utils.isHexStrict(data) ? data : utils.utf8ToHex(data);
    var messageBytes = utils.hexToBytes(messageHex);
    var messageBuffer = Buffer.from(messageBytes);
    var preamble = '\x19LSP6 Execute Relay Call:\n' + messageBytes.length;
    var preambleBuffer = Buffer.from(preamble);
    var ethMessage = Buffer.concat([preambleBuffer, messageBuffer]);
    return ethereumjsUtil.bufferToHex(ethereumjsUtil.keccak256(ethMessage));
};

Accounts.prototype.sign = function sign(data, privateKey) {
    if (!privateKey.startsWith('0x')) {
        privateKey = '0x' + privateKey;
    }

    // 64 hex characters + hex-prefix
    if (privateKey.length !== 66) {
        throw new Error("Private key must be 32 bytes long");
    }

    var hash = this.hashMessage(data);
    var signature = Account.sign(hash, privateKey);
    var vrs = Account.decodeSignature(signature);
    return {
        message: data,
        messageHash: hash,
        v: vrs[0],
        r: vrs[1],
        s: vrs[2],
        signature: signature
    };
};

Accounts.prototype.recover = function recover(message, signature, preFixed) {
    var args = [].slice.apply(arguments);


    if (!!message && typeof message === 'object') {
        return this.recover(message.messageHash, Account.encodeSignature([message.v, message.r, message.s]), true);
    }

    if (!preFixed) {
        message = this.hashMessage(message);
    }

    if (args.length >= 4) {
        preFixed = args.slice(-1)[0];
        preFixed = typeof preFixed === 'boolean' ? !!preFixed : false;

        return this.recover(message, Account.encodeSignature(args.slice(1, 4)), preFixed); // v, r, s
    }
    return Account.recover(message, signature);
};