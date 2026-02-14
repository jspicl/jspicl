# Changelog

## Version 3.0.0

_2020-11-30_

- Project converted to TypeScript using tsdx
- Exports cjs and esm modules
- Types are now available which should provide better Intellisense
- Requires minimum Node v15

## Version 2.6.0

_2020-03-01_

- Addressed an issue wherein `join` with separators longer than one character would not generate a correct string.
- Added array functions `findIndex`, `pop` and `sort`

## Version 2.5.0

_2019-10-04_

- Ensure that default options are not "discarded" when custom options are supplied.
- 3rd party dependencies updated.

## Version 2.4.4

_2019-09-29_

- 3rd party security vulnerability update.

## Version 2.4.3

_2019-09-29_

- Added Github Action for verifying pull requests

## Version 2.4.2

_2019-08-01_

- Updated trastpiler to 1.0.2
- Updated 3rd party dependencies to address their vulnerabilities

## Version 2.4.1

_2019-06-13_

- Updated dependencies to reduce vulnerabilities.

## Version 2.4.0

_2019-03-03_

- Add support for ThrowStatement, README updated accordingly. [Issue #64](https://github.com/AgronKabashi/jspicl/issues/64)
- Bug fix: Parantheses were not properly retained for IIFEs. [Issue #65](https://github.com/AgronKabashi/jspicl/issues/65)
- Exclude global and local 'use strict' directices. [Issue #66](https://github.com/AgronKabashi/jspicl/issues/66)
- Special thanks to the following user(s) for reporting these issues:
  - [Zaoqi](https://github.com/zaoqi)

## Version 2.3.3

_2019-02-01_

- No change in functionality, badges included in README

## Version 2.3.2

_2018-12-14_

- Added scope declarations for FunctionDeclaration, FunctionExpression and ArrowFunctionExpression and corresponding test cases.
- Unary operator ~ is not supported. Added test case for this.

## Version 2.3.1

_2018-10-24_

- Bug fix: FunctionExpression was not passing on the transpilation config causing the AST traversal to break.
- Added test cases for FunctionExpression.

## Version 2.3.0

_2018-10-12_

- Restructured code to eliminate circular dependencies.
- Transpilation functionality was broken out into a separate library, [trastpiler](https://github.com/AgronKabashi/trastpiler).
- Automated input, output and external dependencies for rollup build.
- Transpile is not globally shared anymore, but customizable and instanced.

## Version 2.2.4

_2018-08-15_

- Regression: Esprima was incorrectly listed as devdependency ever since 2.1.0

## Version 2.2.3

_2018-08-14_

- Tests would not re-run in watch mode. Replaced babel for esm.

## Version 2.2.2

_2018-08-13_

- Bug fix: Identifier names were not output in lowercase.

## Version 2.2.1

_2018-07-31_

- Bug fix: Class declaration would generate invalid syntax if a class had methods but no constructor. The manual injection of an empty constructor has been removed and replaced with a check instead. Token count remains unchanged.
- Bug fix: prettify was incorrectly indenting lines after a single-line if-statement.

## Version 2.2.0

_2018-07-31_

- Added support for conditional expressions (a ? b : c)

## Version 2.1.1

_2018-07-27_

- Added logo to readme.

## Version 2.1.0

_2018-07-18_

- Added option to prettify the generated lua code.

## Version 2.0.0

_2018-05-19_
Breaking change: polyfill property in the return object from jspicl is now a table of all included polyfills.

## Version 1.7.0

_2018-05-18_

- Added polyfills for .split, .substr and .substring methods on strings

## Version 1.6.0

_2018-04-14_

- Added support for while and for-loops

## Version 1.5.0

_2018-03-13_

- Added support for arrow function expressions

## Version 1.4.3

_2018-02-19_

- Added unit tests for statements

## Version 1.4.2

_2018-02-14_

- Added temporary workaround for length
  - Will only work for arrays. This will break for objects with a length property.

## Version 1.4.1

_2018-02-02_

- Added support for unit testing.
- Special thanks to the following contributors for making it possible:
  - [M-Lindstrom](https://github.com/M-Lindstrom)

## Version 1.4.0

_2018-01-23_

- Added support for switch-statements.
- Special thanks to the following contributors for making it possible:
  - [eliseellerstedt91](https://github.com/eliseellerstedt91)
  - [mlusiak](https://github.com/mlusiak)

## Version 1.3.0

_2018-01-23_

- Added initial support for scoping, a way for statements, declarations and expressions to gain access to variables or custom properties passed down from parent nodes.
- transpile is now a named export

## Version 1.2.2

_2018-01-08_

- Bug fix: Some object call expressions where manually transpiled which broke callexpressions with computed members;

```js
//                                     BEFORE              AFTER
objA[objB.prop](); // transpiles to -> objA.objB.prop()    objA[objB.prop]()
```

## Version 1.2.1

_2018-01-08_

- Bug fix: Use brackets for computed memberexpressions

## Version 1.2

_2018-01-07_

- Added support for do-while statement
- Added polyfills for Math.abs, Math.ceil, Math.sin and Math.sqrt.
- Optimized token count for Object.entries/keys/values. Higher initial cost but more efficient when used often.
- Cleaned up declarations, statements and expressions. Removed redudant curly braces where not needed.

## Version 1.1.2

_2018-01-05_

- Added Math.min polyfill

## Version 1.1.1

_2018-01-05_

- Bug fix: Normalize variable, property and function names

## Version 1.1

_2017-11-26_

- Basic support for classes

## Version 1.0

_2017-11-14_

- Api now returns an object containing the transpiled code and polyfills instead of a string
- Polyfills are now only included if used
- Added several polyfills/remaps:
  - object/array.toString()
  - console.log
  - array.reduce
  - array.map
  - array.filter
  - array.includes
  - Object.keys
  - Object.entries
  - Object.values

- Tremendous thanks to the contributors for making this possible:
  - [CyrusZei](https://github.com/CyrusZei)
  - [eliseellerstedt91](https://github.com/eliseellerstedt91)
  - [Fredkr](https://github.com/Fredkr)
  - [marols](https://github.com/marols)
  - [M-Lindstrom](https://github.com/M-Lindstrom)
  - [mlusiak](https://github.com/mlusiak)
  - [Morkalork](https://github.com/Morkalork)
  - [nilssonan](https://github.com/nilssonan)
  - [reruined](https://github.com/reruined)
  - [sebastianhallen](https://github.com/sebastianhallen)

## Version 0.4.2

_2017-11-10_

- Added Math.random polyfill

## Version 0.4.1

_2017-11-09_

- Bugfix: Nested callExpressions - transpile callee object and property properly
- Added vscode f5 run & debug launch settings

## Version 0.4.0

_2017-11-08_

- Stabilization & cleanup
- Updated limitations in README
- traverser renamed to transpile
- added eslint rules and dependencies
- mappers are now methods instead of strings. Alleviates customizations.
- Object.assign now supports multiple sources. Fixes #19.
- spreadProperty removed
- bugfix: `ifStatement` did not generate closing tag for else
- bugfix: `join` polyfill didn't remove separator character
- bugfix: `binaryExpression` generated incorrect output for the right expression

## Version 0.3.0

_2017-10-13_

- Added special cases for `Identifier` and `Literal` names
- Added tester.js to try out transpilation.

## Version 0.2.7

_2017-10-13_

- Added support for empty return statements

## Version 0.2.6

_2017-06-05_

- Added decorator for logical expressions to include parantheses if needed.

## Version 0.2.5

_2017-05-22_

- Bug fix: fixed unary expression for `!`

## Version 0.2.4

_2017-05-22_

- Added warning for conditional expressions
- Increased code readability in traverser.js

## Version 0.2.3

_2017-04-26_

- Added support for logical operators

## Version 0.2.0

_2017-04-12_

- Added polyfill support. Added in this version:
- Object.assign
- Array.prototype.join

## Version 0.1.1

_2017-04-07_

- Added support for sequence expression

## Version 0.0.2

_2017-04-06_

- Updated readme to include limitations

## Version 0.0.1

_2017-04-06_

- Initial version
