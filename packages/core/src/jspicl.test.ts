import {describe, expect, it} from "vitest";
import {jspicl} from "./jspicl.js";

describe("jspicl", () => {
  it("transpilation works", () => {
    expect(jspicl("const a = 1").code).toBe("local a = 1");
  });

  it("prettifies output", () => {
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

  it("returns required polyfills", () => {
    const input = "arr.map(x => x * 2)";
    const result = jspicl(input);
    expect(result.polyfills).toHaveProperty("_map");
  });
});
