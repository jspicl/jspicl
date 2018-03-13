# Changelog

#### Version 1.5.0
* Added support for arrow function expressions

#### Version 1.4.3
* Added unit tests for statements

#### Version 1.4.2
* Added temporary workaround for length
  - Will only work for arrays. This will break for objects with a length property.

#### Version 1.4.1
* Added support for unit testing.
* Special thanks to the following contributors for making it possible:
  - [M-Lindstrom](https://github.com/M-Lindstrom)

### Version 1.4.0
* Added support for switch-statements.
* Special thanks to the following contributors for making it possible:
  - [eliseellerstedt91](https://github.com/eliseellerstedt91)
  - [mlusiak](https://github.com/mlusiak)

### Version 1.3.0
* Added initial support for scoping, a way for statements, declarations and expressions to gain access to variables or custom properties passed down from parent nodes.
* transpile is now a named export

#### Version 1.2.2
* Bug fix: Some object call expressions where manually transpiled which broke callexpressions with computed members;
```js
//                                     BEFORE              AFTER
objA[objB.prop](); // transpiles to -> objA.objB.prop()    objA[objB.prop]()
```

#### Version 1.2.1
* Bug fix: Use brackets for computed memberexpressions

### Version 1.2
* Added support for do-while statement
* Added polyfills for Math.abs, Math.ceil, Math.sin and Math.sqrt.
* Optimized token count for Object.entries/keys/values.  Higher initial cost but more efficient when used often.
* Cleaned up declarations, statements and expressions. Removed redudant curly braces where not needed.

#### Version 1.1.2
* Added Math.min polyfill

#### Version 1.1.1
* Bug fix: Normalize variable, property and function names

### Version 1.1
* Basic support for classes

## Version 1.0
* Api now returns an object containing the transpiled code and polyfills instead of a string
* Polyfills are now only included if used
* Added several polyfills/remaps:
  - object/array.toString()
  - console.log
  - array.reduce
  - array.map
  - array.filter
  - array.includes
  - Object.keys
  - Object.entries
  - Object.values

* Tremendous thanks to the contributors for making this possible:
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

#### Version 0.4.2
* Added Math.random polyfill

#### Version 0.4.1
* Bugfix: Nested callExpressions - transpile callee object and property properly
* Added vscode f5 run & debug launch settings

### Version 0.4.0
* Stabilization & cleanup
* Updated limitations in README
* traverser renamed to transpile
* added eslint rules and dependencies
* mappers are now methods instead of strings. Alleviates customizations.
* Object.assign now supports multiple sources. Fixes ##19.
* spreadProperty removed
* bugfix: `ifStatement` did not generate closing tag for else
* bugfix: `join` polyfill didn't remove separator character
* bugfix: `binaryExpression` generated incorrect output for the right expression

### Version 0.3.0
* Added special cases for `Identifier` and `Literal` names
* Added tester.js to try out transpilation.

#### Version 0.2.7
* Added support for empty return statements

#### Version 0.2.6
* Added decorator for logical expressions to include parantheses if needed.

#### Version 0.2.5
* Bug fix: fixed unary expression for `!`

#### Version 0.2.4
* Added warning for conditional expressions
* Increased code readability in traverser.js

#### Version 0.2.3
* Added support for logical operators

### Version 0.2.0
* Added polyfill support. Added in this version:
* Object.assign
* Array.prototype.join

#### Version 0.1.1
* Added support for sequence expression

#### Version 0.0.2
* Updated readme to include limitations

#### Version 0.0.1
* Initial version
