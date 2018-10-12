<p align="center">
  <img src="https://raw.githubusercontent.com/AgronKabashi/assets/51844924e69fdef3129a04573f60b262f41cbea4/jspicl/logo-366x250.png" width="320">
</p>

# jspicl
jspicl is a Javascript to PICO-8 Lua transpiler. It creates an AST out of the JavaScript code and then transpiles it down to the LUA subset of which PICO-8 supports.

## Installation
```
npm install jspicl --save
```

## Usage
```js
import jspicl from "jspicl";

const javascriptCode = `...`;
const { output, polyfills } = jspicl(javascriptCode);
console.log(
  Object.values(polyfills).join("\n"),
  output
);
```

In order to generate a nice lua output you need to explicitly let jspicl know by passing in an options object.
```js
const { output, polyfills } = jspicl(javascriptCode, { prettify: true });
```

### Options
| Property              | Type                      | Description                                   |
|-----------------------|---------------------------|-----------------------------------------------|
| input                 | string                    | JavaScript code to transpile into PICO-8 LUA  |
| options               | object                    |  |
| &ndash; prettify      | boolean                   | Format output |
| &ndash; customMappers | HashMap<string, function> | Custom handlers for transpiling expressions, declarations or statements. |

### Return value
| Property       | Type   | Description                     |
|----------------|--------|---------------------------------|
| output         | string | The transpiled javascript code  |
| polyfills      | object | Table of required polyfills with their corresponding lua code. |

## Customized transpilation
jspicl does not support all expressions or statements out of the box but it is
extensible enough to allow for these to be added. It also allows existing ones to
be replaced if the implementation is considered unsatisfactory.
This is done by supplying a `customMappers` option.

```js
const customMappers = {
  // Replace the default while-statement implementation
  WhileStatement: ({ body, test }, { transpile }) =>
    `while ${transpile(test)} do
      -- We have full control of the output!
      ${transpile(body)}
    end`,

  // Add support for throw statements
  ThrowStatement: ({ argument }, { transpile }) =>
    `assert(true, ${transpile(argument)})`,

  // ...
};

const { output } = jspicl(javascriptCode, { customMappers });
```

## Related projects
[rollup-plugin-jspicl](https://github.com/AgronKabashi/rollup-plugin-jspicl) - Rollup plugin wrapper for jspicl

[games](https://github.com/topics/jspicl-sample) - Games created with jspicl

## Known limitations

|||
|-|-|
| ES2015+ | Not all ES2015+ features are supported. Run your code through a transpiler first such as [bublé](https://www.npmjs.com/package/buble) or [babel](https://www.npmjs.com/package/babel). |
| prototype chains | Not supported|
| Array methods | Not all prototype methods have been polyfilled yet. |
| Math.max | Only supports two arguments. |
| AST | Not all declarations, expressions and statements have been implemented. More will be added as needed. |

## Versioning
This project uses semantic versioning

## License
MIT
