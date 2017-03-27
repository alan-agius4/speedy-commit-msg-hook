# @speedy/commit-msg-hook
[![CircleCI](https://circleci.com/gh/alan-agius4/speedy-commit-msg-hook.svg?style=shield)](https://circleci.com/gh/alan-agius4/speedy-commit-msg-hook)
[![npm version](https://img.shields.io/npm/v/@speedy/commit-msg-hook.svg)](https://www.npmjs.com/package/@speedy/commit-msg-hook)
[![Dependency Status](https://img.shields.io/david/alan-agius4/commit-msg-hook.svg?style=flat-square)](https://david-dm.org/alan-agius4/speedy-commit-msg-hook)
[![devDependency Status](https://img.shields.io/david/dev/alan-agius4/commit-msg-hook.svg?style=flat-square)](https://david-dm.org/alan-agius4/speedy-commit-msg-hook?type=dev)

A highly customizable git commit message hook. It validates a commit message against a set of configuration. Based on the [`Conventional Changelog`](https://github.com/conventional-changelog/conventional-changelog) standards. 

Commit subject format:
```txt
<type>(<scope>): <subject>
```


## Installation

```
npm install @speedy/commit-msg-hook --save-dev
```

## Available Rules

The majority of the rules can be applied in any part of the confirguration.

| Name             | Description                                                      | Type     | Section |
|------------------|------------------------------------------------------------------|----------|---------|
| no-unscoped      | Disallows unscoped commit messages                               | boolean  | Message |
| valid-types      | An array of allowed commit message types ex: `["feat", "chore"]` | string[] | Type    |
| max-length       | Requires text to be under a certain max length                   | number   | All     |
| no-dash          | Disallows dashes                                                 | boolean  | All     |
| no-space         | Disallows spaces                                                 | boolean  | All     |
| no-underscore    | Disallows underscores                                            | boolean  | All     |
| no-camel-case    | Disallows camel cases                                            | boolean  | All     |
| no-kebab-case    | Disallows kebab case                                             | boolean  | All     |
| no-upper-first   | Enforces first character to be lower case                        | boolean  | All     |
| no-lower-firsr   | Enforces first character to be upper case                        | boolean  | All     |
| no-period-at-end | Enforces last character not to be a period                       | boolean  | All     |

## Configuration

By default, it will try to locate the `speedy-commit-msg.json` file in the root of your project folder.

If the file is not found it will fallback to an internal `speedy-commit-msg.json` found in `config` folder.

### Default rules

[speedy-commit-msg.json](https://github.com/alan-agius4/speedy-commit-msg-hook/blob/master/config/speedy-commit-msg.json).

```json
{
  "rules": {
    "message": {
      "max-length": 75
    },
    "type": {
      "valid-types": [
        "amend",
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
Your configuration can extend one or more existing configurations.

```json
{
  "extends": [
    "./node_modules/@speedy/commit-msg-hook/config/speedy-commit-msg.json"
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