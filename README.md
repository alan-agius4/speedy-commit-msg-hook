# @speedy/commit-msg-hook
[![CircleCI](https://circleci.com/gh/alan-agius4/speedy-commit-msg-hook.svg?style=shield)](https://circleci.com/gh/alan-agius4/speedy-commit-msg-hook)
[![npm version](https://img.shields.io/npm/v/@speedy/commit-msg-hook.svg)](https://www.npmjs.com/package/@speedy/commit-msg-hook)
[![dependencies Status](https://david-dm.org/alan-agius4/speedy-commit-msg-hook/status.svg)](https://david-dm.org/alan-agius4/speedy-commit-msg-hook)
[![devDependencies Status](https://david-dm.org/alan-agius4/speedy-commit-msg-hook/dev-status.svg)](https://david-dm.org/alan-agius4/speedy-commit-msg-hook?type=dev)

A highly customizable git commit message hook. Validates a commit message against a set of configuration, based on the [`Conventional Changelog`](https://github.com/conventional-changelog/conventional-changelog) standards. 

Commit first line format:
```txt
<type>(<scope>): <subject>
```

## Installation

```
npm install @speedy/commit-msg-hook --save-dev
```

## Rules

The majority of the rules can be applied in any part of the configuration.

| Name               | Description                                                                                            | Type     | Section |
|--------------------|--------------------------------------------------------------------------------------------------------|----------|---------|
| `no-unscoped`      | Disallows unscoped commit messages                                                                     | boolean  | Message |
| `skip-validation`  | Disable validation for commit messages matching a RegExp. Useful for `Merge` and `Revert` commits)     | RegExp   | Message |
| `valid-types`      | An array of allowed commit message types ex: `["feat", "chore"]`                                       | string[] | Type    |
| `valid-scopes`     | An array of allowed commit message scopes ex: `["router", "platform"]` (Case sensitive)                | string[] | Scope   |
| `banned-phrases`   | An array of disallowed phrases. (Case insensitive)                                                     | string[] | All     |
| `max-length`       | Requires text to be under a certain max length                                                         | number   | All     |
| `no-dash`          | Disallows dashes                                                                                       | boolean  | All     |
| `no-space`         | Disallows spaces                                                                                       | boolean  | All     |
| `no-underscore`    | Disallows underscores                                                                                  | boolean  | All     |
| `no-camel-case`    | Disallows camel cases                                                                                  | boolean  | All     |
| `no-kebab-case`    | Disallows kebab case                                                                                   | boolean  | All     |
| `no-upper-first`   | Enforces first character to be lower case                                                              | boolean  | All     |
| `no-lower-first`   | Enforces first character to be upper case                                                              | boolean  | All     |
| `no-period-at-end` | Enforces last character not to be a period                                                             | boolean  | All     |

## Configuration

By default, will try to locate the `speedy-commit-msg.json` file in the root of your project folder.

If the file is not found it will fallback to an internal `speedy-commit-msg.json` found in `config` folder.

### Default rules

[speedy-commit-msg.json](https://github.com/alan-agius4/speedy-commit-msg-hook/blob/master/config/speedy-commit-msg.json).

```json
{
  "rules": {
    "message": {
      "skip-validation": "^(Merge)\\s",
      "max-length": 100,
      "banned-phrases": [
        "minor change",
        "minor fix",
        "minor refactor",
        "pr change",
        "pr comment",
        "following pr"
      ],
      "no-period-at-end": true,
      "no-upper-first": true
    },
    "type": {
      "valid-types": [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "chore",
        "revert"
      ]
    },
    "scope": {
      "no-dash": true,
      "no-underscore": true
    },
    "subject": {
      "no-period-at-end": true,
      "no-upper-first": true
    }
  }
}
```

### extends
Configuration can be extended with one or many existing configurations.

```json
{
  "extends": [
    "@speedy/commit-msg-hook:latest"
  ],
  "rules": {
    "message": {
      "no-unscoped": true
    },
    "scope": {
      "no-dash": false
    }
  }
}
```
