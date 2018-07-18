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

## Return value
| Property       | Type   | Description                     |
|----------------|--------|---------------------------------|
| output         | string | The transpiled javascript code  |
| polyfills      | object | Table of required polyfills with their corresponding lua code. |

## Related projects
[rollup-plugin-jspicl](https://github.com/AgronKabashi/rollup-plugin-jspicl) - Rollup plugin wrapper for jspicl

[jspicl-mario-sample](https://github.com/AgronKabashi/jspicl-mario-sample) - Mario sample game using jspicl

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
