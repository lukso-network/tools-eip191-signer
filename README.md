# lsp6-signer.js &middot; [![GitHub license](https://img.shields.io/badge/license-Apache-blue.svg)](./LICENSE) [![npm version](https://img.shields.io/npm/v/@lukso/lsp6-signer.js.svg?style=flat)](https://www.npmjs.com/package/@lukso/lsp6-signer.js) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/lukso-network/tools-lsp6-signer/pulls)

<p align="center">
 <h2 align="center"><strong>@lukso/lsp6-signer.js</strong></h2>
 <p align="center">Helper library to sign a transaction
</p>

<p align="center">For more information see <a href="https://docs.lukso.tech/tools/lsp6-signerjs/getting-started">Documentation</a>.</p>

# Getting Started

The `@lukso/lsp6-signer.js` package is used to sign an LSP6 Execute Relay Call transaction.

This library will add the `\x19LSP6 ExecuteRelayCall:\n` prefix to a message and sign it.

The ExcuteRelayCall prefix is used instead of the standard Ethereum transaction prefix to sign messages so that an executeRelayCall transaction cannot be inadvertently signed when signing an Ethereum signed message.

- [GitHub Repository](https://github.com/lukso-network/tools-lsp6-signer)
- [NPM Package](https://www.npmjs.com/package/@lukso/lsp6-signer.js)

## Install

```bash
npm install @lukso/lsp6-signer.js
```

## Setup

```javascript
import { LSP6Signer } from '@lukso/lsp6-signer.js';

const lsp6Signer = new LSP6Signer();
```

## Contributing

Please check [CONTRIBUTING](./CONTRIBUTING.md).

## License

lsp-factory.js is [Apache 2.0 licensed](./LICENSE).
