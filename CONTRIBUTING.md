# Contributing to lsp6-signer.js

## Commits

You should use [Conventional Commit messages](https://www.conventionalcommits.org/).

The Conventional Commits specification is a lightweight convention on top of commit messages.
It provides an easy set of rules for creating an explicit commit history;
which makes it easier to write automated tools on top of.

The most important prefixes you should have in mind are:

- `fix:` which represents bug fixes, and correlates to a [SemVer](https://semver.org/)
  patch.
- `feat:` which represents a new feature, and correlates to a SemVer minor.
- `feat!:`, or `fix!:`, `refactor!:`, etc., which represent a breaking change
  (indicated by the `!`) and will result in a SemVer major.

Other prefixes are also allowed :

- `build:` Changes that affect the build system or external dependencies.
- `ci:` Changes to our CI configuration files and scripts.
- `docs:` Documentation only changes.
- `perf:` A code change that improves performance.
- `refactor:` A code change that neither fixes a bug nor adds a feature.
- `style:` Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).
- `test:` Adding missing tests or correcting existing tests.
- `chore:` Other

Further details on conventional commits can be found here: <https://www.conventionalcommits.org/en/v1.0.0/>

## Building

```
npm run build
```

This will build the library into `/build`.

## Testing

```
yarn test
```

## Become a contributor

To become a contributor please follow the [all-contributors](https://github.com/all-contributors/all-contributors) specification.
