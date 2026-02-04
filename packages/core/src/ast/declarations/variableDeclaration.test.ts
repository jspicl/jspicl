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

  describe("Object patterns", () => {
    it("transpiles object destructuring", () => {
      const input = "const {a} = b";
      const output = "local a = b.a";

      const {
        body: [declaration]
      } = esprima.parseScript(input);

      expect(VariableDeclaration(declaration, parserOptions)).toBe(output);
    });

    it("transpiles multiple object destructuring", () => {
      const input = "const {a,b} = c";
      const output = "local a = c.a\nlocal b = c.b";

      const {
        body: [declaration]
      } = esprima.parseScript(input);

      expect(VariableDeclaration(declaration, parserOptions)).toBe(output);
    });

    it("handles renaming of variables destructuring", () => {
      const input = "const {a: x,b: y} = c";
      const output = "local x = c.a\nlocal y = c.b";

      const {
        body: [declaration]
      } = esprima.parseScript(input);

      expect(VariableDeclaration(declaration, parserOptions)).toBe(output);
    });
  });

  describe("Array patterns", () => {
    it("transpiles array destructuring", () => {
      const input = "const [a, b] = c";
      const output = "local a = c[1]\nlocal b = c[2]";

      const {
        body: [declaration]
      } = esprima.parseScript(input);

      expect(VariableDeclaration(declaration, parserOptions)).toBe(output);
    });
  });
});
