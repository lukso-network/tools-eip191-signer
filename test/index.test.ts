import { LSP6Signer } from '../src/index';

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

describe('Hash message function', () => {
  const lsp6Signer = new LSP6Signer();
  it('should be hexadecimal and of 32 bites', () => {
    testCases.forEach((data) => {
      const hash = lsp6Signer.hashMessage(data);
      expect(hash.substring(0, 2)).toBe('0x');
      expect(hash.length).toBe(66);
    });
  });
  it('should be prefixed with "\x19LSP6 Execute Relay Call:\n"', () => {
    const hashedMessage = lsp6Signer.hashMessage('Hello World');
    expect(hashedMessage).toBe(
      '0x267dbe91dc4e45f9ab588be314b8f954513a4bcd55015a9380bea074b76dc91f',
    );
  });
});

describe('Sign transaction function', () => {
  const lsp6Signer = new LSP6Signer();
  testCases.forEach((data) => {
    const signedObject = lsp6Signer.sign(data, signingKey);
    it('should give back an object with the right properties', () => {
      expect(signedObject).toHaveProperty('message');
      expect(signedObject).toHaveProperty('messageHash');
      expect(signedObject).toHaveProperty('v');
      expect(signedObject).toHaveProperty('r');
      expect(signedObject).toHaveProperty('s');
      expect(signedObject).toHaveProperty('signature');
    });
  });
});

describe('Recover the address function of a transaction', () => {
  it('should recover the signing address when the message is not prefixed', () => {
    const lsp6Signer = new LSP6Signer();
    testCases.forEach((data) => {
      const messageData = lsp6Signer.sign(data, signingKey);
      const message = messageData.message;
      const signature = messageData.signature;
      const isMessagePrefixed = false;
      const recoveredAddress = lsp6Signer.recover(
        message,
        signature,
        isMessagePrefixed,
      );
      expect(recoveredAddress).toBe(signingAddress);
      expect(recoveredAddress.substring(0, 2)).toBe('0x');
      expect(recoveredAddress.length).toBe(42);
    });
  });

  it('should recover the signer address when recovering signed hash', () => {
    const lsp6Signer = new LSP6Signer();
    testCases.forEach((data) => {
      const messageData = lsp6Signer.sign(data, signingKey);
      const message = messageData.message;
      const messagePrefixed = lsp6Signer.hashMessage(message);
      const signature = messageData.signature;
      const isMessagePrefixed = true;
      const recoveredAddress = lsp6Signer.recover(
        messagePrefixed,
        signature,
        isMessagePrefixed,
      );
      expect(recoveredAddress).toBe(signingAddress);
    });
  });

  it('should not recover the right signing adress when the message is not prefixed and isMessagePrefixed is true', () => {
    const lsp6Signer = new LSP6Signer();
    testCases.forEach((data) => {
      const messageData = lsp6Signer.sign(data, signingKey);
      const message = messageData.message;
      const signature = messageData.signature;
      const isMessagePrefixed = true;
      const recoveredAddress = lsp6Signer.recover(
        message,
        signature,
        isMessagePrefixed,
      );
      expect(recoveredAddress).not.toBe(signingAddress);
    });
  });

  it('should recover the address when the message is an object', () => {
    const lsp6Signer = new LSP6Signer();
    testCases.forEach((data) => {
      const messageData = lsp6Signer.sign(data, signingKey);
      const signature = messageData.signature;
      const isMessagePrefixed = true;
      const recoveredAddress = lsp6Signer.recover(
        messageData,
        signature,
        isMessagePrefixed,
      );
      expect(recoveredAddress).toBe(signingAddress);
    });
  });

  it('should recover the address even if isMessagePrefixed is not specified', () => {
    const lsp6Signer = new LSP6Signer();
    testCases.forEach((data) => {
      const messageData = lsp6Signer.sign(data, signingKey);
      const signature = messageData.signature;
      const recoveredAddress = lsp6Signer.recover(messageData, signature);
      expect(recoveredAddress).toBe(signingAddress);
    });
  });

  it('should accept both hashed and unhashed message', () => {
    const lsp6Signer = new LSP6Signer();
    testCases.forEach((rawData) => {
      const hashedData = lsp6Signer.hashMessage(rawData);

      const messageData = lsp6Signer.sign(rawData, signingKey);
      const signature = messageData.signature;

      const recoveredAddressFromRawData = lsp6Signer.recover(
        rawData,
        signature,
        false,
      );
      const recoveredAddressFromHashedData = lsp6Signer.recover(
        hashedData,
        signature,
        true,
      );
      expect(recoveredAddressFromRawData).toBe(recoveredAddressFromHashedData);
    });
  });
});
