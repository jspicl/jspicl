# jspicl
jspicl is a Javascript to PICO-8 Lua transpiler. It depends on Esprima to generate an AST which is then used to convert the original code into the LUA subset of which PICO-8 supports.

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
  polyfills,
  output
);
```

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
