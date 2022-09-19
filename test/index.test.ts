import { LSP6Signer } from '../src/index';

const signingKey =
  'ffeb17b9a6059fec3bbab63d76b060b7380cac7a62ce6621a134531a46458968';

const signingAddress = '0x2b389f8EB52D16A105e02165a2AC1450461A237b';

const testCases = [
  'hello',
  'horse',
  'computer',
  'week-end',
  'amuse',
  'breakfast',
  'series',
  'season',
  'recovery',
  'threshold',
  'step',
  'composer',
  'mill',
  'verdict',
];

describe('Hash message function', () => {
  const lsp6Signer = new LSP6Signer();
  testCases.forEach((data) => {
    const hash = lsp6Signer.hashMessage(data);
    it('should be hexadecimal', () => {
      expect(hash.substring(0, 2)).toBe('0x');
    });
    it('should create a hash of 32 bites', () => {
      expect(hash.length).toBe(66);
    });
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
  it('should recover the signing address of a transaction when the message is not prefixed', () => {
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

  it('should recover the wrong signing adress as isMessagePrefixed is set to true and the message is not prefixed ', () => {
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
});
