---
layout: post.liquid
title: Reference - API
sort: 3.1
---

# API Reference

#### jspicl

Entry point for transpiling your JavaScript code.

```ts
function jspicl(source: string, options?: JspiclOptions): JspiclOutput;
```

<ul class="argument-list">
  <li>
    <code>rootNode</code>
    <span>
      Root node of your AST. jspicl will transpile the entire hierarchy.
    </span>
  </li>

  <li>
    <code>options</code>
    <span>Configuration options that affect the final output.</span>
  </li>
</ul>

#### JspiclOptions

```ts
type JspiclOptions = {
  prettify?: boolean;
  customMappers?: Record<string, AstNodeParser>;
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

#### JspiclOutput

```ts
type JspiclOutput = {
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

#### AstNode

Represents a node in the syntax tree. All nodes contain at least a type property.

```ts
type AstNode = {
  type: string;
  [key: string]: any;
};
```

#### AstNodeParser

Contract for a parser function. The function should be named after the AST node type. Binding a scopeBoundary field on the function will create a new scope for all variables defined inside the hieararchy.

```ts
type AstNodeParser = {
  (node: Omit<AstNode, "type">, options: AstNodeParserOptions): string;
  scopeBoundary?: boolean;
};
```

#### AstNodeParserOptions

Includes references to the transpile function and scope.

```ts
type AstNodeParserOptions = {
  transpile: TranspileFunction;
  scope: {
    variables: Record<string, any>;
    [key: string]: any;
  };
};
```

#### TranspileFunction

```ts
type TranspileFunction = (node: AstNode, options?: TranspileOptions) => string;
```

#### TranspileOptions

```ts
type TranspileOptions = {arraySeparator?: string};
```
