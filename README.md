# stylelint-only

Run stylelint with only one or more specific rules using your current config. It's kind of like [eslint-nibble](https://www.npmjs.com/package/eslint-nibble) for stylelint!

## Install
```
npm install --dev stylelint-only
```

## Usage

```sh
npx stylelint-only [rules] -- [files] [stylelint arguments]
```

The `stylelint-only` CLI writes a JSON configuration to disk with all but the specified rules disabled, then runs the `stylelint` CLI with that configuration and the rest of the provided arguments. For instance, to autofix only a single rule in your `src` directory:

```sh
npx stylelint-only color-hex-case -- --fix src
```

### Options
The following options are respected (before the `--` in the CLI arguments, after which all arguments are passed to `stylelint`):

- `-o path` writes the generated configuration to the provided path.
- `--files path` tells [stylelint's `printConfig()` function](https://github.com/stylelint/stylelint/blob/e1a40111f530c3c4541ef5b2e4ec4b6f11b95589/lib/printConfig.js#L52-L55) the file for which it should resolve the configuration. The default is `.` (the current working directory). Despite the plural name, this option should be a single path and may not contain any globs or other "magic" characters.

### Gotchas
It's very possible that the generated configuration will not respect nested stylelint configuration overrides. If your project relies heavily on nested configurations, you should pass the `--files` option to tell `stylelint-only` the _first_ path from which to generate the temporary config file, as in:

```sh
npx stylelint-only color-hex-case --files path/to/file.css -- --fix path/to/file.css
```
