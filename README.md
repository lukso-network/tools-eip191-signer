# lsp6-signer.js &middot; [![GitHub license](https://img.shields.io/badge/license-Apache-blue.svg)](./LICENSE)

<p align="center">
 <h2 align="center"><strong>@lukso/lsp6-signer.js</strong></h2>
 <p align="center">Helper library to sign a transaction
</p>

## Install

```bash
npm install @lukso/lsp6-signer.js
```

## Setup

```javascript
import { LSPFactory } from '@lukso/lsp6-signer.js';

const lsp6Signer = new LSP6Signer();
```

## Usage

### Hash a message

```javascript
const hash = lsp6Signer.hashMessage(message);
```

### Sign a transaction

```javascript
const signedObject = lsp6Signer.sign(message, signingKey);
```

### Recover an adress used to sign a transaction

```javascript
const recoveredAddress = lsp6Signer.recover(
  message,
  signature,
  isMessagePrefixed,
);
```

###

## Contributing

Please check [CONTRIBUTING](./CONTRIBUTING.md).

## License

lsp-factory.js is [Apache 2.0 licensed](./LICENSE).
