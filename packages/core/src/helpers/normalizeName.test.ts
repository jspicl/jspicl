import {describe, expect, it} from "vitest";
import {normalizeName} from "./normalizeName.js";

describe("normalizeName", () => {
  it("converts uppercase letters to lowercase", () => {
    expect(normalizeName("MyVariable")).toBe("myvariable");
  });

  it("converts mixed case to lowercase", () => {
    expect(normalizeName("CamelCaseVariable")).toBe("camelcasevariable");
  });

  it("replaces dollar signs with underscores", () => {
    expect(normalizeName("$variable")).toBe("_variable");
  });

  it("replaces multiple dollar signs with underscores", () => {
    expect(normalizeName("$my$variable$")).toBe("_my_variable_");
  });

  it("handles both uppercase and dollar signs", () => {
    expect(normalizeName("$MyVariable")).toBe("_myvariable");
  });

  it("handles names with only dollar signs", () => {
    expect(normalizeName("$$")).toBe("__");
  });

  it("handles empty strings", () => {
    expect(normalizeName("")).toBe("");
  });

  it("handles names with numbers", () => {
    expect(normalizeName("Variable123")).toBe("variable123");
  });

  it("handles consecutive dollar signs", () => {
    expect(normalizeName("$$var$$")).toBe("__var__");
  });

  it("preserves other special characters except dollar signs", () => {
    expect(normalizeName("my-variable@test")).toBe("my-variable@test");
  });
});
