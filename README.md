# jspicl
jspicl is a Javascript to PICO-8 Lua transpiler. The Javascript code is processed by Esprima which will create an AST that is used to generate Lua code as faithful to the original as possible.

## Installation
```
npm install jspicl
```

## Usage
```js
import jspicl from "jspicl";

const javascriptCode = `...`;
const generatedLuaCode = jspicl(javascriptCode);
```

## Related projects
[rollup-plugin-jspicl](https://github.com/AgronKabashi/rollup-plugin-jspicl) - Rollup plugin wrapper for jspicl

[jspicl-mario-sample](https://github.com/AgronKabashi/jspicl-mario-sample) - Mario sample game using jspicl

## Known limitations

|||
|-|-|
| ES2015+ | Not all ES2015+ features are supported. Run your code through a transpiler first such as [bublé](https://www.npmjs.com/package/buble) or [babel](https://www.npmjs.com/package/babel). |
| Array methods | Not all prototype methods have been polyfilled yet. |
| Math.max | Only supports two arguments |
| AST | Not all declarations, expressions and statements have been implemented. More will be added as needed. |

## Versioning
This project uses semantic versioning

## License
MIT
