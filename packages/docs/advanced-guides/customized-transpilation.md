---
layout: post.liquid
title: Customized Transpilation
sort: 2.2
---

# Customized transpilation

jspicl does not support all expressions and statements out of the box but it is
extensible enough to allow for these to be added. It also allows existing ones to
be replaced if the implementation is considered unsatisfactory.
This is done by supplying a `customMappers` option. The only requirement imposed on
the AST node is that it contains a string property called `type` since this is used to identify the appropriate declaration, expression or statement.

<div class="subheading">Resources</div>
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

```js
import {jspicl} from "@jspicl/core";

const customMappers = {
  // Replace the default while-statement implementation
  WhileStatement: ({ body, test }, { transpile }) =>
    `while ${transpile(test)} do
      -- We have full control of the output!
      ${transpile(body)}
    end`,

  // Add support for missing features
  ForOfStatement: ({ left, right, body }, {transpile}) => {
    // ...
  },

  // Custom statements, declarations and expressions are also valid
  // as long as the nodes are included in the AST
  SuperDuperComment: () => `-- You're doing great!`,

  // ...
};

const { code } = jspicl(javascriptCode, { customMappers });
```
