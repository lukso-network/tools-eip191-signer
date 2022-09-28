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

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification.

## License

lsp6-signer.js is [Apache 2.0 licensed](./LICENSE).

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://github.com/magalimorin18"><img src="https://avatars.githubusercontent.com/u/51906903?v=4?s=50" width="50px;" alt="Magali Morin"/><br /><sub><b>Magali Morin</b></sub></a><br /><a href="https://github.com/Fabian Vogelsteller/tools-lsp6-signer/commits?author=magalimorin18" title="Code">💻</a> <a href="https://github.com/Fabian Vogelsteller/tools-lsp6-signer/commits?author=magalimorin18" title="Tests">⚠️</a></td>
      <td align="center"><a href="https://lukso.network/"><img src="https://avatars.githubusercontent.com/u/232662?v=4?s=50" width="50px;" alt="Fabian Vogelsteller"/><br /><sub><b>Fabian Vogelsteller</b></sub></a><br /><a href="#ideas-frozeman" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center"><a href="https://github.com/CallumGrindle"><img src="https://avatars.githubusercontent.com/u/54543428?v=4?s=50" width="50px;" alt="Callum Grindle"/><br /><sub><b>Callum Grindle</b></sub></a><br /><a href="https://github.com/Fabian Vogelsteller/tools-lsp6-signer/pulls?q=is%3Apr+reviewed-by%3ACallumGrindle" title="Reviewed Pull Requests">👀</a> <a href="#mentoring-CallumGrindle" title="Mentoring">🧑‍🏫</a></td>
      <td align="center"><a href="http://www.hugomasclet.com/"><img src="https://avatars.githubusercontent.com/u/477945?v=4?s=50" width="50px;" alt="Hugo Masclet"/><br /><sub><b>Hugo Masclet</b></sub></a><br /><a href="https://github.com/Fabian Vogelsteller/tools-lsp6-signer/pulls?q=is%3Apr+reviewed-by%3AHugoo" title="Reviewed Pull Requests">👀</a> <a href="#mentoring-Hugoo" title="Mentoring">🧑‍🏫</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
