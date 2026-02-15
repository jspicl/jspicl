import {describe, it, expect} from "vitest";
import {jspicl} from "../../jspicl.js";

describe("BinaryExpression", () => {
  it("transpiles addition", () => {
    const result = jspicl("const x = 1 + 2", {prettify: false});
    expect(result.code).toBe("local x = 1 + 2");
  });

  it("transpiles subtraction", () => {
    const result = jspicl("const x = 5 - 3", {prettify: false});
    expect(result.code).toBe("local x = 5 - 3");
  });

  it("transpiles multiplication", () => {
    const result = jspicl("const x = 2 * 3", {prettify: false});
    expect(result.code).toBe("local x = 2 * 3");
  });

  it("transpiles division", () => {
    const result = jspicl("const x = 10 / 2", {prettify: false});
    expect(result.code).toBe("local x = 10 / 2");
  });

  it("transpiles === to ==", () => {
    const result = jspicl("const x = a === b", {prettify: false});
    expect(result.code).toBe("local x = a == b");
  });

  it("transpiles !== to !=", () => {
    const result = jspicl("const x = a !== b", {prettify: false});
    expect(result.code).toBe("local x = a != b");
  });

  it("wraps nested expressions in parentheses for multiplication", () => {
    const result = jspicl("const x = (1 + 2) * 3", {prettify: false});
    expect(result.code).toBe("local x = (1 + 2) * 3");
  });
});
