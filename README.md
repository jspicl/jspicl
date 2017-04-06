# jspicl
jspicl is a Javascript to PICO-8 Lua transpiler. The Javascript code is processed by Esprima which will create an AST that is used to generate Lua code as faithful to the original as possible.

# Installation
```
npm install jspicl --save-dev
```

# Usage
```js
import jspicl from "jspicl";

const javascriptCode = `...`;
const generatedLuaCode = jspicl(javascriptCode);
```

# Related projects
If you're using Rollup then you may want to consider using [rollup-plugin-jspicl](https://github.com/AgronKabashi/rollup-plugin-jspicl).

# Known limitations

|||
|-|-|
| ES2015+ | Not all ES2015+ features are supported. Run your code through a transpiler first such as [bublé](https://www.npmjs.com/package/buble) or [babel](https://www.npmjs.com/package/babel). |
| Object.assign | Only supports two arguments currently. `Object.assign(a, b)` |
| AST | Not all declarations, expressions and statements have been implemented. More will be added as needed. |