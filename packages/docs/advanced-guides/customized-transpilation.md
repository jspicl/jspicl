---
layout: post.liquid
title: Customized Transpilation
description: Extend jspicl with custom mappers to handle unsupported JavaScript features or override default transpilation behavior.
sort: 2.2
---

# Customized transpilation

jspicl does not support all expressions and statements out of the box but it is
extensible enough to allow for these to be added. It also allows existing ones to
be replaced if the implementation is considered unsatisfactory.
This is done by supplying a `customMappers` option. The only requirement imposed on
the AST node is that it contains a string property called `type` since this is used to identify the appropriate declaration, expression or statement.

```js
import {jspicl} from "@jspicl/core";

const customMappers = {
  // Replace the default while-statement implementation
  WhileStatement: ({body, test}, {transpile}) =>
    `while ${transpile(test)} do
      -- We have full control of the output!
      ${transpile(body)}
    end`,

  // Add support for missing features
  ForOfStatement: ({left, right, body}, {transpile}) => {
    // ...
  },

  // Custom statements, declarations and expressions are also valid
  // as long as the nodes are included in the AST
  SuperDuperComment: () => `-- You're doing great!`

  // ...
};

const {code} = jspicl(javascriptCode, {customMappers});
```

## Polyfill Transform

When using the CLI, you can customize how polyfills are output using the `polyfillTransform` option. This is useful when you need to modify the generated polyfill code before it's written to the cartridge.

The `polyfillTransform` function receives a record where keys are polyfill names and values are their implementations:

```typescript
// jspicl.config.ts
const config: Config = {
  polyfillTransform: (polyfills) => {
    // Modify the polyfill code as needed
    return Object.values(polyfills).join("\n");
  }
  // ...
};
```

See the [Custom Polyfill Transforms](/recipes/polyfill-transform/) recipe for practical examples.

<h2 class="subheading">Resources</h2>
<div class="link-list">
  <a
    class="link-item"
    href="https://astexplorer.net"
    target="_blank"
    rel="noopener"
  >
    <img src="/assets/images/astexplorer.png" alt="astexplorer.net" />
    <span>
      <strong>AST Explorer</strong>
      Analyze and explore your code's Abstract Syntax Tree
    </span>
  </a>
  <a
    class="link-item"
    href="https://github.com/AgronKabashi/trastpiler"
    target="_blank"
    rel="noopener"
  >
    <img src="/assets/images/github.svg" alt="Trastpiler" />
    <span>
      <strong>Trastpiler</strong>
      An agnostic transpiler for Abstract Syntax Trees. <code>jspicl</code> is built
      on top of Trastpiler.
    </span>
  </a>
</div>
