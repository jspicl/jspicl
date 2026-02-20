---
layout: post.liquid
title: Reference - API
description: Complete API reference for @jspicl/core. Function signatures, options, output types, and custom mappers.
sort: 4.1
---

# API Reference

## Installation

```bash
npm install -D @jspicl/cli
```

## Usage

Entry point for transpiling your JavaScript code.

```ts
function jspicl(source: string, options?: Options): Output;
```

<ul class="argument-list">
  <li>
    <code>root</code>
    <span>
      Root node of your AST. Jspicl will traverse and transpile the entire hierarchy.
    </span>
  </li>

  <li>
    <code>options</code>
    <span>Configuration options that affect the final output.</span>
  </li>
</ul>

#### Options

```ts
type Options = {
  prettify?: boolean;
  customMappers?: Record<string, AstNodeVisitor>;
};
```

<ul class="argument-list">
  <li>
    <code>prettify = true</code>
    <span>
      Prettifies the transpiled code. By default, jspicl formats the Lua output for you but if performance ever
      becomes an issue you can turn this off by setting this to false.
    </span>
  </li>

  <li>
    <code>customMappers</code>
    <span>Custom handlers for transpiling expressions, declarations or statements.</span>
  </li>
</ul>

#### Output

```ts
type Output = {
  code: string;
  polyfills: Record<string, string>;
};
```

<ul class="argument-list">
  <li>
    <code>code</code>
    <span>
      The transpiled Lua code.
    </span>
  </li>

  <li>
    <code>polyfills</code>
    <span>
      A hashmap of detected polyfills. The polyfills are recommended but you can replace them with your own implementation if needed. Generate the final result by joining the values: <code>Object.values(polyfills).join("\n")</code>
    </span>
  </li>
</ul>

### Types

Types can be imported from `@jspicl/core/types`:

```typescript
import type {
  JspiclOptions,
  JspiclOutput,
  AstNodeParser
} from "@jspicl/core/types";
```

## Custom Mappers

You can provide custom mappers to override how specific AST node types are transpiled:

```javascript
import {jspicl} from "@jspicl/core";

const customMappers = {
  Literal: ({raw}) => {
    // Custom handling for literals
    return raw === "null" ? "nil" : raw;
  }
};

const result = jspicl(source, {customMappers});
```

Each mapper receives the AST node and an options object with:

- `transpile` - Function to recursively transpile child nodes
- `scope` - Object containing variable metadata and scope information

## Supported Polyfills

When your JavaScript uses methods without direct Lua equivalents, jspicl automatically detects and provides polyfill implementations:

- Array methods: `map`, `filter`, `reduce`, `includes`, `findIndex`, `join`, `pop`, `sort`
- String methods: `split`, `substr`, `substring`, `toString`
- Object methods: `Object.assign`, `Object.keys`, `Object.values`, `Object.entries`

The polyfills are returned separately so you can include them once at the top of your PICO-8 cartridge.

#### ASTNode

Represents a node in the syntax tree. All nodes contain at least a type property.

```ts
type ASTNode = {
  type: string;
  [key: string]: any;
};
```

#### AstNodeVisitor

Contract for a visitor function. The function should be named after the AST node type. Binding a scopeBoundary field on the function will create a new scope for all variables defined inside the hierarchy.

```ts
type AstNodeVisitor<T extends ASTNode = ASTNode> = {
  (node: T, options: AstNodeVisitorOptions): string;
  scopeBoundary?: boolean;
};
```

#### AstNodeVisitorOptions

Includes references to the transpile function and scope.

```ts
type AstNodeVisitorOptions = {
  transpile: TranspileFunction;
  scope: {
    variables: Record<string, any>;
    [key: string]: any;
  };
};
```

#### TranspileFunction

```ts
type TranspileFunction = (node: ASTNode, options?: TranspileOptions) => string;
```

#### TranspileOptions

```ts
type TranspileOptions = {arraySeparator?: string};
```
