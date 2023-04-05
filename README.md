# eip191-signer.js &middot; [![GitHub license](https://img.shields.io/badge/license-Apache-blue.svg)](./LICENSE) [![npm version](https://img.shields.io/npm/v/@lukso/eip191-signer.js.svg?style=flat)](https://www.npmjs.com/package/@lukso/eip191-signer.js) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/lukso-network/tools-eip191-signer/pulls)

<p align="center">
 <h2 align="center"><strong>@lukso/eip191-signer.js</strong></h2>
 <p align="center">Helper library to sign any <a href="https://eips.ethereum.org/EIPS/eip-191"> EIP191</a> data.
</p>

<p align="center">For more information see <a href="https://docs.lukso.tech/tools/eip191-signerjs/getting-started">Documentation</a>.</p>

# Getting Started

The `@lukso/eip191-signer.js` package is used to sign messages according to the [EIP191 standard](https://eips.ethereum.org/EIPS/eip-191).

If you want to sign with the version **0x45**, then use the function **signEthereumSignedMessage**.

If you want to sign with the version **0x00**, then use the function **signDataWithIntendedValidator**.

- [GitHub Repository](https://github.com/lukso-network/tools-eip191-signer)
- [NPM Package](https://www.npmjs.com/package/@lukso/eip191-signer.js)

## Install

```bash
npm install @lukso/eip191-signer.js
```

## Usage

```javascript
import { EIP191Signer } from '@lukso/eip191-signer.js';

const eip191Signer = new EIP191Signer();
```

### Example of Signing an LSP6KeyManager relay call

The [LSP6-KeyManager](https://docs.lukso.tech/standards/universal-profile/lsp6-key-manager#relay-execution) standard uses version 0 for signed messages. Therefore, it should us [`signDataWithIntendedValidator`](#signdatawithintendedvalidator).

```js
const chainId = await web3.eth.getChainId(); 

let encodedMessage = web3.utils.encodePacked(
  { value: LSP6_VERSION, type: 'uint256' }, // LSP6_VERSION = 6;
  { value: chainId, type: 'uint256' },
  { value: nonce, type: 'uint256' },
  { value: msgValue, type: 'uint256' },
  { value: abiPayload, type: 'bytes' },
);

let eip191Signer = new EIP191Signer();

let { signature } = await eip191Signer.signDataWithIntendedValidator(
  keyManagerAddress, // intended validator is the address of the Key Manager
  encodedMessage,    //  
  controllerPrivateKey,
);
```

## hashEthereumSignedMessage

```javascript
eip191Signer.hashEthereumSignedMessage(message);
```

Hashes the given message with the version 0x45.

The message will be enveloped as follows: `'\x19' + '\x45' + 'thereum Signed Message:\n' + messageBytes.length + message` and hashed using keccak256.

## hashDataWithIntendedValidator

```javascript
eip191Signer.hashDataWithIntendedValidator(validatorAddress, message);
```

Hashes the given message with the version 0x00.

The message will be enveloped as follows: `'\x19' + '\x00' + validatorAddress + message` and hashed using keccak256.

## signEthereumSignedMessage

```javascript
eip191Signer.signEthereumSignedMessage(message, signingKey);
```

This method is for signing a message with the version 0x45.

The message passed as parameter will be wrapped as follows: `'\x19' + '\x45' + 'thereum Signed Message:\n' + messageBytes.length + message`.

## signDataWithIntendedValidator

```javascript
eip191Signer.signDataWithIntendedValidator(
  validatorAddress,
  message,
  signingKey,
);
```

This method is for signing a message with the version 0x00.

The message passed as parameter will be wrapped as follows: `'\x19' + '\x00' + validatorAddress + message`.

## recover

```javascript
eip191Signer.recover(messageHash, signature);
```

Recovers the address which was used to sign the given message.

## Contributing

Please check [`CONTRIBUTING.md`](./CONTRIBUTING.md).

## License

eip191-signer.js is [Apache 2.0 licensed](./LICENSE).

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://github.com/magalimorin18"><img src="https://avatars.githubusercontent.com/u/51906903?v=4?s=50" width="50px;" alt="Magali Morin"/><br /><sub><b>Magali Morin</b></sub></a><br /><a href="https://github.com/lukso-network/tools-eip191-signer/commits?author=magalimorin18" title="Code">💻</a> <a href="https://github.com/lukso-network/tools-eip191-signer/commits?author=magalimorin18" title="Tests">⚠️</a></td>
      <td align="center"><a href="https://github.com/frozeman"><img src="https://avatars.githubusercontent.com/u/232662?v=4?s=50" width="50px;" alt="Fabian Vogelsteller"/><br /><sub><b>Fabian Vogelsteller</b></sub></a><br /><a href="#ideas-frozeman" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center"><a href="https://github.com/CallumGrindle"><img src="https://avatars.githubusercontent.com/u/54543428?v=4?s=50" width="50px;" alt="Callum Grindle"/><br /><sub><b>Callum Grindle</b></sub></a><br /><a href="https://github.com/lukso-network/tools-eip191-signer/pulls?q=is%3Apr+reviewed-by%3ACallumGrindle" title="Reviewed Pull Requests">👀</a> <a href="#mentoring-CallumGrindle" title="Mentoring">🧑‍🏫</a></td>
      <td align="center"><a href="https://github.com/Hugoo"><img src="https://avatars.githubusercontent.com/u/477945?v=4?s=50" width="50px;" alt="Hugo Masclet"/><br /><sub><b>Hugo Masclet</b></sub></a><br /><a href="https://github.com/lukso-network/tools-eip191-signer/pulls?q=is%3Apr+reviewed-by%3AHugoo" title="Reviewed Pull Requests">👀</a> <a href="#mentoring-Hugoo" title="Mentoring">🧑‍🏫</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
