import utils from 'web3-utils';

import { EIP191Signer } from '../src/index';

const signingKey =
  'ffeb17b9a6059fec3bbab63d76b060b7380cac7a62ce6621a134531a46458968';

const signingAddress = '0x2b389f8EB52D16A105e02165a2AC1450461A237b';

const validatorAddress = '0xAd278a6eAd89f6B6c6Fdf54A3E6E876660593b45';

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

describe('function hashEthereumSignedMessage', () => {
  it('should be hexadecimal and of 32 bites', () => {
    testCases.forEach((data) => {
      const hashedData = eip191Signer.hashEthereumSignedMessage(data);

      expect(utils.isHexStrict(hashedData)).toBeTruthy();
      expect(hashedData.length).toBe(66);
    });
  });

  it('should be prefixed with "\x19\x45thereum Signed Message:\n"', () => {
    const hashedMessage = eip191Signer.hashEthereumSignedMessage('Hello World');

    expect(hashedMessage).toBe(
      '0xa1de988600a42c4b4ab089b619297c17d53cffae5d5120d82d8a92d0bb3b78f2',
    );
  });
});

describe('function hashDataWithIntendedValidator', () => {
  it('should be hexadecimal and of 32 bites', () => {
    testCases.forEach((data) => {
      const hashedData = eip191Signer.hashDataWithIntendedValidator(
        validatorAddress,
        data,
      );

      expect(utils.isHexStrict(hashedData)).toBeTruthy();
      expect(hashedData.length).toBe(66);
    });
  });

  it('should be prefixed with "\x19\x000xAd278a6eAd89f6B6c6Fdf54A3E6E876660593b45"', () => {
    const hashedMessage = eip191Signer.hashDataWithIntendedValidator(
      validatorAddress,
      'Hello World',
    );

    expect(hashedMessage).toBe(
      '0xa63022286ecaa3317625e319a64b3bf01c41da558dfc1890e8cb196eb414ffd5',
    );
  });

  it("should throw Error with message 'Validator needs to be a valid address' when validator's address is invalid", () => {
    testCases.forEach((data) => {
      const invalidValidatorAddress =
        '0xC1912fEE45d61C87Cc5EA59DaE31190FFFFf232d';

      function functionValidator() {
        eip191Signer.hashDataWithIntendedValidator(
          invalidValidatorAddress,
          data,
        );
      }

      expect(functionValidator).toThrow(
        new Error('Validator needs to be a valid address'),
      );
    });
  });
});

describe('function signEthereumSignedMessage', () => {
  it('should return an object with the expected properties', () => {
    testCases.forEach((data) => {
      const signedObject = eip191Signer.signEthereumSignedMessage(
        data,
        signingKey,
      );

      expect(signedObject).toHaveProperty('message');
      expect(signedObject).toHaveProperty('messageHash');
      expect(signedObject).toHaveProperty('v');
      expect(signedObject).toHaveProperty('r');
      expect(signedObject).toHaveProperty('s');
      expect(signedObject).toHaveProperty('signature');
    });
  });

  it('should sign correctly "Hello World"', () => {
    const signedObject = eip191Signer.signEthereumSignedMessage(
      'Hello World',
      signingKey,
    );

    expect(signedObject.signature).toBe(
      '0x85c15865f2909897c1be6d66c1d9c86d6125978aec9e28d1a69d4d306bde694f7cf9723f0eeaf8815e3fa984ac1d7bf3c420786ead91abd4dd9c1657897efec11c',
    );
  });
});

describe('function signDataWithIntendedValidator', () => {
  it('should return an object with the expected properties', () => {
    testCases.forEach((data) => {
      const signedObject = eip191Signer.signDataWithIntendedValidator(
        validatorAddress,
        data,
        signingKey,
      );

      expect(signedObject).toHaveProperty('message');
      expect(signedObject).toHaveProperty('messageHash');
      expect(signedObject).toHaveProperty('v');
      expect(signedObject).toHaveProperty('r');
      expect(signedObject).toHaveProperty('s');
      expect(signedObject).toHaveProperty('signature');
    });
  });
  it('should sign correctly "Hello World"', () => {
    const signedObject = eip191Signer.signDataWithIntendedValidator(
      validatorAddress,
      'Hello World',
      signingKey,
    );

    expect(signedObject.signature).toBe(
      '0xa7572d888a22711e180df23cf0d11748fcc0c08c0178cd88aecd1ce47b01c26469d4a87cefb20495ed07a76b4f0e4f553e32fb6333b6a325a442aae249b703181b',
    );
  });
});

describe('Recover the address of a signed EthereumSignedMessage', () => {
  it('should recover the signing address', () => {
    testCases.forEach((data) => {
      const messageData = eip191Signer.signEthereumSignedMessage(
        data,
        signingKey,
      );
      const hasedMessage = messageData.messageHash;
      const signature = messageData.signature;
      const recoveredAddress = eip191Signer.recover(hasedMessage, signature);

      expect(recoveredAddress).toBe(signingAddress);
      expect(utils.isHexStrict(recoveredAddress)).toBeTruthy();
      expect(recoveredAddress.length).toBe(42);
    });
  });

  it('should recover the signing address when the message is an object', () => {
    testCases.forEach((data) => {
      const messageData = eip191Signer.signEthereumSignedMessage(
        data,
        signingKey,
      );
      const signature = messageData.signature;
      const recoveredAddress = eip191Signer.recover(messageData, signature);

      expect(recoveredAddress).toBe(signingAddress);
    });
  });
});

describe(' Recover the address of a signed DataWithIntendedValidator', () => {
  it('should recover the signing address', () => {
    testCases.forEach((data) => {
      const messageData = eip191Signer.signDataWithIntendedValidator(
        validatorAddress,
        data,
        signingKey,
      );
      const hasedMessage = messageData.messageHash;
      const signature = messageData.signature;
      const recoveredAddress = eip191Signer.recover(hasedMessage, signature);

      expect(recoveredAddress).toBe(signingAddress);
      expect(utils.isHexStrict(recoveredAddress)).toBeTruthy();
      expect(recoveredAddress.length).toBe(42);
    });
  });

  it('should recover the signing address when the message is an object', () => {
    testCases.forEach((data) => {
      const messageData = eip191Signer.signDataWithIntendedValidator(
        validatorAddress,
        data,
        signingKey,
      );
      const signature = messageData.signature;
      const recoveredAddress = eip191Signer.recover(messageData, signature);

      expect(recoveredAddress).toBe(signingAddress);
    });
  });
});
