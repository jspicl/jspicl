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

By default, jspicl formats the LUA output for you but if performance ever becomes an issue you can turn this off through the options argument.
```js
const { output, polyfills } = jspicl(javascriptCode, { prettify: false });
```

### Options
<table>
<thead>
  <tr>
    <th>Property</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>input</td>
    <td>string</td>
    <td>JavaScript code to transpile into PICO-8 LUA</td>
  </tr>
  <tr>
    <td>options</td>
    <td>object</td>
    <td></td>
  </tr>
  <tr>
    <td>&nbsp;&nbsp;&nbsp;&nbsp;prettify</td>
    <td>boolean</td>
    <td>Format output</td>
  </tr>
  <tr>
    <td valign="top">&nbsp;&nbsp;&nbsp;&nbsp;customMappers</td>
    <td valign="top">HashMap&lt;string, function&gt;</td>
    <td>Custom handlers for transpiling expressions, declarations or statements.</td>
  </tr>
</tbody>
</table>

### Return value
| Property       | Type   | Description                     |
|----------------|--------|---------------------------------|
| output         | string | The transpiled javascript code  |
| polyfills      | object | Table of required polyfills with their corresponding lua code. |

## Customized transpilation
jspicl does not support all expressions or statements out of the box but it is
extensible enough to allow for these to be added. It also allows existing ones to
be replaced if the implementation is considered unsatisfactory.
This is done by supplying a `customMappers` option. The only requirement imposed on AST node is that they contain a string property called `type` since this is used to identify the appropriate declaration, expression or statement.

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
