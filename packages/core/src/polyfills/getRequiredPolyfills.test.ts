import {describe, it, expect} from "vitest";
import {getRequiredPolyfills} from "./getRequiredPolyfills.js";

describe("getRequiredPolyfills", () => {
  it("detects _map polyfill", () => {
    const code = "_map(arr, fn)";
    const polyfills = getRequiredPolyfills(code);
    expect(polyfills).toHaveProperty("_map");
  });

  it("detects _filter polyfill", () => {
    const code = "_filter(arr, fn)";
    const polyfills = getRequiredPolyfills(code);
    expect(polyfills).toHaveProperty("_filter");
  });

  it("detects multiple polyfills", () => {
    const code = "_map(arr, fn)\n_filter(arr, fn)";
    const polyfills = getRequiredPolyfills(code);
    expect(polyfills).toHaveProperty("_map");
    expect(polyfills).toHaveProperty("_filter");
  });

  it("does not detect method calls on objects", () => {
    const code = "obj._map(arr)";
    const polyfills = getRequiredPolyfills(code);
    expect(polyfills).not.toHaveProperty("_map");
  });

  it("returns empty object when no polyfills needed", () => {
    const code = "local x = 1";
    const polyfills = getRequiredPolyfills(code);
    expect(Object.keys(polyfills)).toHaveLength(0);
  });
});
