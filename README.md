<p align="center">
  <img src="https://raw.githubusercontent.com/AgronKabashi/assets/51844924e69fdef3129a04573f60b262f41cbea4/jspicl/logo-366x250.png" width="320">
</p>

# jspicl
jspicl is a Javascript to PICO-8 Lua transpiler. It creates an AST out of the JavaScript code and then transpiles it down to the LUA subset of which PICO-8 supports.

#
![npm version](https://img.shields.io/npm/v/jspicl.svg?logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABG2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8%2BCiA8L3JkZjpSREY%2BCjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8%2BGkqr6gAAAYJpQ0NQc1JHQiBJRUM2MTk2Ni0yLjEAACiRdZG5S0NBEIe%2FRMUrHqCFhUWQaJWIBwRtBBNEhSAhRjBqk7xcQo7HewkSbAXbgIJo41XoX6CtYC0IiiKIjY21oo2G57xEiIiZZWe%2F%2Fe3MsDsL1mBKSev1Q5DO5LTAtMe%2BGFqyNz5jxUIz7bjCiq5O%2Bv0%2BatrHncSK3bjMWrXj%2FrXWaExXwNIkPKGoWk54Rti3llNN3hbuVpLhqPCpsFOTCwrfmnqkwi8mJyr8ZbIWDHjB2ilsT%2FziyC9WklpaWF6OI53KKz%2F3MV9ii2UW5mXtk9mLToBpPNiZZQovboYZF%2B%2FGxQiDsqNG%2FlA5f46s5CriVQporJIgSQ6nqHmpHpM1LnpMRoqC2f%2B%2FfdXjoyOV6jYPNDwZxls%2FNG5BqWgYn4eGUTqCuke4yFTzswcw9i56sao59qFjA84uq1pkB843oedBDWvhslQn0xqPw%2BsJtIWg6xpalis9%2Bznn%2BB6C6%2FJVV7C7BwMS37HyDQziZ72ofXamAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABX0lEQVRYhWNkIBH8Z%2FAxZmBgOIND2oSRYctZUsxjItUB1AajDhh1ACMuib%2F7I6cz%2FHjugCHxTfwHw2Hbz9j0%2FA9R4GUUZOXAEGdmP8Ci4ZCJTQ8LTqf9eO7A9OaABoZh%2FLoMf2t7sWphenqRgfH7B0wJTgGc1gx4FIw6YMAdwPL%2Fn7oxNol%2Fh4V%2B%2FOfXxZTgVsFtGhsnw38swv%2F%2Fsfz4X74Sqz0sDLgqFhO9w39%2FTMJtGRbwT1QNqzjTwQefcdkz4FEw6oBRB7AwMDCYYJPI%2BMo658w%2FzDJfk1GcYSFLDFbDNm2%2BxPD27RcMcUlhbl4fHPawMDLdxNqGc3%2Fxg%2BP8%2Fye4nY4FvH37heHFy08Y4lxcbByMneFY7RnwKBh1wIA7AGeLSJqR%2F4A7A0aDiEH0t%2FSPiY%2F5sDbJxMVFeJW42DCaZLy8HAdw2YOzTYgLaK79j7dndD2YcbRnNOqAoeUAACxTWA4U4oxaAAAAAElFTkSuQmCC&style=for-the-badge)
![library size](https://img.shields.io/bundlephobia/min/jspicl.svg?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABG2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+Gkqr6gAAAYJpQ0NQc1JHQiBJRUM2MTk2Ni0yLjEAACiRdZG5S0NBEIe/RMUrHqCFhUWQaJWIBwRtBBNEhSAhRjBqk7xcQo7HewkSbAXbgIJo41XoX6CtYC0IiiKIjY21oo2G57xEiIiZZWe//e3MsDsL1mBKSev1Q5DO5LTAtMe+GFqyNz5jxUIz7bjCiq5O+v0+atrHncSK3bjMWrXj/rXWaExXwNIkPKGoWk54Rti3llNN3hbuVpLhqPCpsFOTCwrfmnqkwi8mJyr8ZbIWDHjB2ilsT/ziyC9WklpaWF6OI53KKz/3MV9ii2UW5mXtk9mLToBpPNiZZQovboYZF+/GxQiDsqNG/lA5f46s5CriVQporJIgSQ6nqHmpHpM1LnpMRoqC2f+/fdXjoyOV6jYPNDwZxls/NG5BqWgYn4eGUTqCuke4yFTzswcw9i56sao59qFjA84uq1pkB843oedBDWvhslQn0xqPw+sJtIWg6xpalis9+znn+B6C6/JVV7C7BwMS37HyDQziZ72ofXamAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABX0lEQVRYhWNkIBH8Z/AxZmBgOIND2oSRYctZUsxjItUB1AajDhh1ACMuib/7I6cz/HjugCHxTfwHw2Hbz9j0/A9R4GUUZOXAEGdmP8Ci4ZCJTQ8LTqf9eO7A9OaABoZh/LoMf2t7sWphenqRgfH7B0wJTgGc1gx4FIw6YMAdwPL/n7oxNol/h4V+/OfXxZTgVsFtGhsnw38swv//sfz4X74Sqz0sDLgqFhO9w39/TMJtGRbwT1QNqzjTwQefcdkz4FEw6oBRB7AwMDCYYJPI+Mo658w/zDJfk1GcYSFLDFbDNm2+xPD27RcMcUlhbl4fHPawMDLdxNqGc3/xg+P8/ye4nY4FvH37heHFy08Y4lxcbByMneFY7RnwKBh1wIA7AGeLSJqR/4A7A0aDiEH0t/SPiY/5sDbJxMVFeJW42DCaZLy8HAdw2YOzTYgLaK79j7dndD2YcbRnNOqAoeUAACxTWA4U4oxaAAAAAElFTkSuQmCC)
![npm downloads](https://img.shields.io/npm/dm/jspicl.svg?logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABG2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8%2BCiA8L3JkZjpSREY%2BCjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8%2BGkqr6gAAAYJpQ0NQc1JHQiBJRUM2MTk2Ni0yLjEAACiRdZG5S0NBEIe%2FRMUrHqCFhUWQaJWIBwRtBBNEhSAhRjBqk7xcQo7HewkSbAXbgIJo41XoX6CtYC0IiiKIjY21oo2G57xEiIiZZWe%2F%2Fe3MsDsL1mBKSev1Q5DO5LTAtMe%2BGFqyNz5jxUIz7bjCiq5O%2Bv0%2BatrHncSK3bjMWrXj%2FrXWaExXwNIkPKGoWk54Rti3llNN3hbuVpLhqPCpsFOTCwrfmnqkwi8mJyr8ZbIWDHjB2ilsT%2FziyC9WklpaWF6OI53KKz%2F3MV9ii2UW5mXtk9mLToBpPNiZZQovboYZF%2B%2FGxQiDsqNG%2FlA5f46s5CriVQporJIgSQ6nqHmpHpM1LnpMRoqC2f%2B%2FfdXjoyOV6jYPNDwZxls%2FNG5BqWgYn4eGUTqCuke4yFTzswcw9i56sao59qFjA84uq1pkB843oedBDWvhslQn0xqPw%2BsJtIWg6xpalis9%2Bznn%2BB6C6%2FJVV7C7BwMS37HyDQziZ72ofXamAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABX0lEQVRYhWNkIBH8Z%2FAxZmBgOIND2oSRYctZUsxjItUB1AajDhh1ACMuib%2F7I6cz%2FHjugCHxTfwHw2Hbz9j0%2FA9R4GUUZOXAEGdmP8Ci4ZCJTQ8LTqf9eO7A9OaABoZh%2FLoMf2t7sWphenqRgfH7B0wJTgGc1gx4FIw6YMAdwPL%2Fn7oxNol%2Fh4V%2B%2FOfXxZTgVsFtGhsnw38swv%2F%2Fsfz4X74Sqz0sDLgqFhO9w39%2FTMJtGRbwT1QNqzjTwQefcdkz4FEw6oBRB7AwMDCYYJPI%2BMo658w%2FzDJfk1GcYSFLDFbDNm2%2BxPD27RcMcUlhbl4fHPawMDLdxNqGc3%2Fxg%2BP8%2Fye4nY4FvH37heHFy08Y4lxcbByMneFY7RnwKBh1wIA7AGeLSJqR%2F4A7A0aDiEH0t%2FSPiY%2F5sDbJxMVFeJW42DCaZLy8HAdw2YOzTYgLaK79j7dndD2YcbRnNOqAoeUAACxTWA4U4oxaAAAAAElFTkSuQmCC&style=for-the-badge)
![](https://img.shields.io/npm/l/jspicl.svg?style=for-the-badge)
#

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
