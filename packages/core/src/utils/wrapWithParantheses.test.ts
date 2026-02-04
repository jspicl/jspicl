import {describe, expect, it} from "vitest";
import {wrapWithParantheses} from "./wrapWithParantheses.js";

describe("wrapWithParantheses", () => {
  it("wraps expression with parentheses when condition is true", () => {
    const result = wrapWithParantheses(true, "myExpression");
    expect(result).toBe("(myExpression)");
  });

  it("does not wrap expression when condition is false", () => {
    const result = wrapWithParantheses(false, "myExpression");
    expect(result).toBe("myExpression");
  });

  it("handles empty string expression when condition is true", () => {
    const result = wrapWithParantheses(true, "");
    expect(result).toBe("()");
  });

  it("handles empty string expression when condition is false", () => {
    const result = wrapWithParantheses(false, "");
    expect(result).toBe("");
  });

  it("handles complex expressions with parentheses already present", () => {
    const result = wrapWithParantheses(true, "(a + b)");
    expect(result).toBe("((a + b))");
  });

  it("handles function call expressions", () => {
    const result = wrapWithParantheses(true, "myFunc(arg1, arg2)");
    expect(result).toBe("(myFunc(arg1, arg2))");
  });

  it("preserves whitespace in expressions", () => {
    const result = wrapWithParantheses(true, "  spaced  ");
    expect(result).toBe("(  spaced  )");
  });
});
