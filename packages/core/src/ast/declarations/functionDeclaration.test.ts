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

    expect(FunctionDeclaration(statement, parserOptions)).toBe(output);
  });

  it("renders a function that accepts arguments", () => {
    const input = "function a(arg1, arg2) { content; }";
    const output = `function a(arg1, arg2)
    content
  end`;
    const {
      body: [statement]
    } = esprima.parseScript(input);

    expect(FunctionDeclaration(statement, parserOptions)).toBe(output);
  });

  it("normalizes function names to lowercase", () => {
    const input = "function MyFunction() {}";
    const output = `function myfunction()
    \n  end`;
    const {
      body: [statement]
    } = esprima.parseScript(input);
    expect(FunctionDeclaration(statement, parserOptions)).toBe(output);
  });

  it("replaces $ with _ in function names", () => {
    const input = "function $a() { content; }";
    const output = `function _a()
    content
  end`;
    const {
      body: [statement]
    } = esprima.parseScript(input);

    expect(FunctionDeclaration(statement, parserOptions)).toBe(output);
  });
});
