import esprima from "esprima";
import {FunctionDeclaration} from "./functionDeclaration.js";
import {createJspiclTranspiler} from "../../transpile.js";
import {describe, it, expect, beforeEach} from "vitest";
import type {TranspileContext, TranspileFunction} from "trastpiler";

describe("FunctionDeclaration", () => {
  let transpile: TranspileFunction;
  let parserOptions: TranspileContext;

  beforeEach(() => {
    transpile = createJspiclTranspiler();
    parserOptions = {
      transpile,
      scope: {
        variables: {}
      }
    };
  });

  it("adds scope boundary", () => {
    expect(FunctionDeclaration.scopeBoundary).toBe(true);
  });

  it("renders a function with content", () => {
    const input = "function a() { content; }";
    const output = `function a()
    content
  end`;
    const {
      body: [statement]
    } = esprima.parseScript(input);

    expect(
      FunctionDeclaration(statement as FunctionDeclaration, parserOptions)
    ).toBe(output);
  });

  it("renders a function that accepts arguments", () => {
    const input = "function a(Arg1, Arg2) { content; }";
    const output = `function a(arg1, arg2)
    content
  end`;
    const {
      body: [statement]
    } = esprima.parseScript(input);

    expect(
      FunctionDeclaration(statement as FunctionDeclaration, parserOptions)
    ).toBe(output);
  });

  it("normalizes function names to lowercase", () => {
    const input = "function MyFunction() {}";
    const output = `function myfunction()
    \n  end`;
    const {
      body: [statement]
    } = esprima.parseScript(input);
    expect(
      FunctionDeclaration(statement as FunctionDeclaration, parserOptions)
    ).toBe(output);
  });

  it("replaces $ with _ in function names", () => {
    const input = "function $a() { content; }";
    const output = `function _a()
    content
  end`;
    const {
      body: [statement]
    } = esprima.parseScript(input);

    expect(
      FunctionDeclaration(statement as FunctionDeclaration, parserOptions)
    ).toBe(output);
  });

  it("handles object destructuring in parameters", () => {
    const input = "function foo({A, B}) { return A + B; }";
    const output = `function foo(__p0)
    local a = __p0.a
local b = __p0.b
return a + b
  end`;
    const {
      body: [statement]
    } = esprima.parseScript(input);

    expect(
      FunctionDeclaration(statement as FunctionDeclaration, parserOptions)
    ).toBe(output);
  });

  it("handles array destructuring in parameters", () => {
    const input = "function bar([X, Y]) { return X + Y; }";
    const output = `function bar(__p0)
    local x = __p0[1]
local y = __p0[2]
return x + y
  end`;
    const {
      body: [statement]
    } = esprima.parseScript(input);

    expect(
      FunctionDeclaration(statement as FunctionDeclaration, parserOptions)
    ).toBe(output);
  });

  it("handles mixed regular and destructured parameters", () => {
    const input = "function baz(A, {B, C}, D) { return A + B + C + D; }";
    const output = `function baz(a, __p1, d)
    local b = __p1.b
local c = __p1.c
return a + b + c + d
  end`;
    const {
      body: [statement]
    } = esprima.parseScript(input);

    expect(
      FunctionDeclaration(statement as FunctionDeclaration, parserOptions)
    ).toBe(output);
  });

  it("handles object destructuring and assignment in parameters", () => {
    const input = "function foo({a=1, b:c=1}) { return a + c; }";
    const output = `function foo(__p0)
    local a = __p0.a or 1
local c = __p0.b or 1
return a + c
  end`;
    const {
      body: [statement]
    } = esprima.parseScript(input);

    expect(
      FunctionDeclaration(statement as FunctionDeclaration, parserOptions)
    ).toBe(output);
  });
});
