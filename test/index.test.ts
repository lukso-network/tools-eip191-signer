import { EIP191Signer } from '../src/index';

const signingKey =
  'ffeb17b9a6059fec3bbab63d76b060b7380cac7a62ce6621a134531a46458968';

const signingAddress = '0x2b389f8EB52D16A105e02165a2AC1450461A237b';

const testCases = [
  'Hello World',
  '',
  ' ',
  'a',
  'https://web3js.readthedocs.io/en/v1.2.11/web3-utils.html#hextoasciI',
  'mm-ll',
  '1234567890',
  '.[]{}()<>*+-=!?^$|@%',
  '0x2b389f8EB52D16A105e02165a2AC1450461A237b',
  'The family’s excitement over going to Disneyland was crazier than she anticipated.',
  'čžíáýùûüÿàâæçéèêëïîôœ',
];

const eip191Signer = new EIP191Signer();

describe('Hash message function', () => {
  it('should be hexadecimal and of 32 bites', () => {
    testCases.forEach((data) => {
      const hash = eip191Signer.hashEthereumSignedMessage(data);

      expect(hash.substring(0, 2)).toBe('0x');
      expect(hash.length).toBe(66);
    });
  });

  it('should be prefixed with "\x19Execute Relay Call:\n"', () => {
    const hashedMessage = eip191Signer.hashEthereumSignedMessage('Hello World');

    expect(hashedMessage).toBe(
      '0x677739c1b99336b0c40ed12a4d77c68805f8b5ca2d865676de85bf83b3b664ee',
    );
  });
});

describe('Sign ethereum signed message function', () => {
  testCases.forEach((data) => {
    const signedObject = eip191Signer.signEthereumSignedMessage(data, signingKey);

    it('should return an object with the expected properties', () => {
      expect(signedObject).toHaveProperty('message');
      expect(signedObject).toHaveProperty('messageHash');
      expect(signedObject).toHaveProperty('v');
      expect(signedObject).toHaveProperty('r');
      expect(signedObject).toHaveProperty('s');
      expect(signedObject).toHaveProperty('signature');
    });
  });
});

describe('Recover the address function of an ethereum signed message', () => {
  it('should recover the signing address when the message is not prefixed', () => {
    testCases.forEach((data) => {
      const messageData = eip191Signer.signEthereumSignedMessage(data, signingKey);
      const message = messageData.message;
      const signature = messageData.signature;
      const recoveredAddress = eip191Signer.recover(message, signature);

      expect(recoveredAddress).toBe(signingAddress);
      expect(recoveredAddress.substring(0, 2)).toBe('0x');
      expect(recoveredAddress.length).toBe(42);
    });
  });

  it('should recover the signing address when recovering signed hash', () => {
    testCases.forEach((data) => {
      const messageData = eip191Signer.signEthereumSignedMessage(data, signingKey);
      const message = messageData.message;
      const signature = messageData.signature;

      const messagePrefixed = eip191Signer.signEthereumSignedMessage(message);
      const isMessagePrefixed = true;

      const recoveredAddress = eip191Signer.recover(
        messagePrefixed,
        signature,
        isMessagePrefixed,
      );
      expect(recoveredAddress).toBe(signingAddress);
    });
  });

  it('should not recover the correct signing address when the message is not prefixed and hashed and isMessagePrefixed is true', () => {
    const messageData = eip191Signer.signEthereumSignedMessage(
      'Hello I am a non prefixed message',
      signingKey,
    );
    const message = messageData.message;
    const signature = messageData.signature;
    const isMessagePrefixed = true;
    const recoveredAddress = eip191Signer.recover(
      message,
      signature,
      isMessagePrefixed,
    );
    expect(recoveredAddress).not.toBe(signingAddress);
  });

  it('should recover the correct signing address when the message is already prefixed and hashed and isMessagePrefixed is true', () => {
    const nonPrefixedMessage = 'Hello - I will soon be a prefixed message';
    const prefixedAndHashedMessage = eip191Signer.hashEthereumSignedMessage(nonPrefixedMessage);

    const messageData = eip191Signer.signEthereumSignedMessage(nonPrefixedMessage, signingKey);
    const signature = messageData.signature;

    const isMessagePrefixed = true;
    const recoveredAddress = eip191Signer.recover(
      prefixedAndHashedMessage,
      signature,
      isMessagePrefixed,
    );

    expect(recoveredAddress).toBe(signingAddress);
  });

  it('should recover the signing address when the message is an object', () => {
    testCases.forEach((data) => {
      const messageData = eip191Signer.signEthereumSignedMessage(data, signingKey);
      const signature = messageData.signature;
      const isMessagePrefixed = true;
      const recoveredAddress = eip191Signer.recover(
        messageData,
        signature,
        isMessagePrefixed,
      );

      expect(recoveredAddress).toBe(signingAddress);
    });
  });

  it('should recover the signing address even if isMessagePrefixed is not specified', () => {
    testCases.forEach((data) => {
      const messageData = eip191Signer.signEthereumSignedMessage(data, signingKey);
      const signature = messageData.signature;
      const recoveredAddress = eip191Signer.recover(messageData, signature);

      expect(recoveredAddress).toBe(signingAddress);
    });
  });

  it('should accept both prefixed + hashed and unhashed message', () => {
    testCases.forEach((rawData) => {
      const hashedData = eip191Signer.hashEthereumSignedMessage(rawData);

      const messageData = eip191Signer.signEthereumSignedMessage(rawData, signingKey);
      const signature = messageData.signature;

      const recoveredAddressFromRawData = eip191Signer.recover(
        rawData,
        signature,
        false,
      );
      const recoveredAddressFromHashedData = eip191Signer.recover(
        hashedData,
        signature,
        true,
      );

      expect(recoveredAddressFromRawData).toBe(recoveredAddressFromHashedData);
    });
  });
});
