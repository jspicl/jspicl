import esprima from "esprima";
import {beforeEach, describe, expect, it} from "vitest";
import {VariableDeclaration} from "./variableDeclaration.js";
import {createJspiclTranspiler} from "../../transpile.js";
import type {TranspileContext, TranspileFunction} from "trastpiler";

describe("VariableDeclaration", () => {
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

  it("transpiles variable declarations", () => {
    const input = "const a = 1";
    const output = "local a = 1";

    const {
      body: [declaration]
    } = esprima.parseScript(input);

    expect(VariableDeclaration(declaration, parserOptions)).toBe(output);
  });

  it("transpiles let declarations", () => {
    const input = "let x = 42";
    const output = "local x = 42";

    const {
      body: [declaration]
    } = esprima.parseScript(input);

    expect(VariableDeclaration(declaration, parserOptions)).toBe(output);
  });

  it("transpiles null to nil", () => {
    const input = "const a = null";
    const output = "local a = nil";

    const {
      body: [declaration]
    } = esprima.parseScript(input);

    expect(VariableDeclaration(declaration, parserOptions)).toBe(output);
  });

  it("transpiles undefined to nil", () => {
    const input = "const a = undefined";
    const output = "local a = nil";

    const {
      body: [declaration]
    } = esprima.parseScript(input);

    expect(VariableDeclaration(declaration, parserOptions)).toBe(output);
  });
});
