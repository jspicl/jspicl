import {describe, it, expect} from "vitest";
import {prettify} from "./prettify.js";
import {readFileSync} from "node:fs";
import {fileURLToPath} from "node:url";
import {dirname, join} from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

describe("prettify", () => {
  it("indents function bodies", () => {
    const input = "function foo()\nreturn 1\nend";
    const output = prettify(input);
    expect(output).toBe("function foo()\n  return 1\nend");
  });

  it("indents if statements", () => {
    const input = "if true then\nreturn 1\nend";
    const output = prettify(input);
    expect(output).toBe("if true then\n  return 1\nend");
  });

  it("handles nested blocks", () => {
    const input = "function foo()\nif true then\nreturn 1\nend\nend";
    const output = prettify(input);
    expect(output).toBe(
      "function foo()\n  if true then\n    return 1\n  end\nend"
    );
  });

  it("handles while loops", () => {
    const input = "while true do\nprint(1)\nend";
    const output = prettify(input);
    expect(output).toBe("while true do\n  print(1)\nend");
  });

  it("handles for loops", () => {
    const input = "for i=1,10 do\nprint(i)\nend";
    const output = prettify(input);
    expect(output).toBe("for i=1,10 do\n  print(i)\nend");
  });

  it("preserves empty lines", () => {
    const input = "local a = 1\n\nlocal b = 2";
    const output = prettify(input);
    expect(output).toBe("local a = 1\n\nlocal b = 2");
  });

  it("indents lua code", () => {
    const input = readFileSync(join(__dirname, "../fixtures/luacode.lua")).toString();
    const expected = readFileSync(join(__dirname, "../fixtures/expected.lua")).toString();

    expect(prettify(input)).toBe(expected);
  });
});
