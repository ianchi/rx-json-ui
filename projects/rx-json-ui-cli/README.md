# rx-json-ui CLI

CLI application that provides tooling for generating json schemas from the widget components and to validate widget definitions json files

## Usage

```
rx-json-ui [command] [options]

rx-json-ui help
```

### Generate schemas

Generate json schema for all widgets provided in specified module

```
 rx-json-ui generate|g [options] <outPath>
```

### Verify widget definitions

Validates the input widgets definitions files against the generated schemas.
Besides the standard json schema validation, it performs syntactic validation of expressions.

````
rx-json-ui validate|val [options] <glob...>
```
````
