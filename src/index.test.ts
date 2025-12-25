import {describe, it, expect} from "vitest";
import {jspicl} from "./index.js";

describe("jspicl", () => {
  it("transpiles variable declarations", () => {
    expect(jspicl("const a = 1").code).toBe("local a = 1");
  });

  it("transpiles let declarations", () => {
    expect(jspicl("let x = 42").code).toBe("local x = 42");
  });

  it("prettifies output by default", () => {
    const input = `function a() {
      if (true) {
        return true;
        if (false) {
          return false
        }
      }
    }`;

    const output = `function a()
  if true then
    return true
    if false then
      return false
    end
  end
end`;

    expect(jspicl(input).code).toBe(output);
  });

  it("can disable prettify", () => {
    const input = "function a() { return 1 }";
    const result = jspicl(input, {prettify: false});
    expect(result.code).toContain("function a()");
  });

  it("returns required polyfills", () => {
    const input = "arr.map(x => x * 2)";
    const result = jspicl(input);
    expect(result.polyfills).toHaveProperty("_map");
  });

  it("transpiles null to nil", () => {
    expect(jspicl("const a = null").code).toBe("local a = nil");
  });

  it("transpiles undefined to nil", () => {
    expect(jspicl("const a = undefined").code).toBe("local a = nil");
  });
});
