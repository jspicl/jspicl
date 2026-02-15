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

    expect(
      VariableDeclaration(declaration as VariableDeclaration, parserOptions)
    ).toBe(output);
  });

  it("transpiles let declarations", () => {
    const input = "let x = 42";
    const output = "local x = 42";

    const {
      body: [declaration]
    } = esprima.parseScript(input);

    expect(
      VariableDeclaration(declaration as VariableDeclaration, parserOptions)
    ).toBe(output);
  });

  it("transpiles null to nil", () => {
    const input = "const a = null";
    const output = "local a = nil";

    const {
      body: [declaration]
    } = esprima.parseScript(input);

    expect(
      VariableDeclaration(declaration as VariableDeclaration, parserOptions)
    ).toBe(output);
  });

  it("transpiles undefined to nil", () => {
    const input = "const a = undefined";
    const output = "local a = nil";

    const {
      body: [declaration]
    } = esprima.parseScript(input);

    expect(
      VariableDeclaration(declaration as VariableDeclaration, parserOptions)
    ).toBe(output);
  });

  describe("Object patterns", () => {
    it("transpiles object destructuring and value assignment", () => {
      const input = "const {a, b=1, c:d, e:f=1} = q;";
      const output =
        "local a = q.a\nlocal b = q.b or 1\nlocal d = q.c\nlocal f = q.e or 1";

      const {
        body: [declaration]
      } = esprima.parseScript(input);

      expect(
        VariableDeclaration(declaration as VariableDeclaration, parserOptions)
      ).toBe(output);
    });
  });

  describe("Array patterns", () => {
    it("transpiles array destructuring and value assignment", () => {
      const input = "const [a, , c=1] = q;";
      const output = "local a = q[1]\nlocal c = q[3] or 1";

      const {
        body: [declaration]
      } = esprima.parseScript(input);

      expect(
        VariableDeclaration(declaration as VariableDeclaration, parserOptions)
      ).toBe(output);
    });
  });
});
