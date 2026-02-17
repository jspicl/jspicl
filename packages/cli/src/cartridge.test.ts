import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {describe, it, expect} from "vitest";
import {
  generateCartridgeContent,
  getPicoSectionsFromCartridge
} from "./cartridge.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe("generateCartridgeContent", () => {
  it("generates minimal cartridge with lua only", () => {
    const result = generateCartridgeContent({lua: "print('hello')"});
    const expected = fs.readFileSync(
      path.join(__dirname, "../test/fixtures/cartridge/expected/luaOnly.txt"),
      "utf8"
    );
    expect(result).toEqual(expected);
  });

  it("generates cartridge with all sections", () => {
    const result = generateCartridgeContent({
      lua: "print('hello')",
      gfx: "00000000",
      gff: "0000",
      map: "0000",
      sfx: "000000",
      music: "00"
    });
    const expected = fs.readFileSync(
      path.join(
        __dirname,
        "../test/fixtures/cartridge/expected/allSections.txt"
      ),
      "utf8"
    );
    expect(result).toEqual(expected);
  });

  it("generates empty cartridge when no sections provided", () => {
    const result = generateCartridgeContent({});
    const expected = fs.readFileSync(
      path.join(__dirname, "../test/fixtures/cartridge/expected/empty.txt"),
      "utf8"
    );
    expect(result).toEqual(expected);
  });

  it("omits empty sections from output", () => {
    const result = generateCartridgeContent({
      gfx: "abc123",
      gff: "",
      map: "",
      sfx: "",
      music: ""
    });
    const expected = fs.readFileSync(
      path.join(
        __dirname,
        "../test/fixtures/cartridge/expected/partialSections.txt"
      ),
      "utf8"
    );
    expect(result).toEqual(expected);
  });
});

describe("getPicoSectionsFromCartridge", () => {
  it("parses cartridge with all sections", () => {
    const result = getPicoSectionsFromCartridge(
      path.join(__dirname, "../test/fixtures/cartridge/input/partial.txt")
    );
    expect(result).toEqual({
      lua: "print('test')",
      gfx: "abcdef",
      gff: "123456",
      map: "fedcba",
      sfx: "999999",
      music: "888888"
    });
  });

  it("returns empty strings for missing sections", () => {
    const result = getPicoSectionsFromCartridge(
      path.join(__dirname, "../test/fixtures/cartridge/input/luaOnly.txt")
    );
    expect(result).toEqual({
      lua: "local x = 1",
      gfx: "",
      gff: "",
      map: "",
      sfx: "",
      music: ""
    });
  });

  it("returns empty sections for non-existent file", () => {
    const result = getPicoSectionsFromCartridge(
      path.join(__dirname, "../test/fixtures/cartridge/input/nonexistent.txt")
    );
    expect(result).toEqual({
      lua: "",
      gfx: "",
      gff: "",
      map: "",
      sfx: "",
      music: ""
    });
  });

  it("handles multiline lua code", () => {
    const result = getPicoSectionsFromCartridge(
      path.join(__dirname, "../test/fixtures/cartridge/input/multilineLua.txt")
    );
    expect(result.lua).toEqual(
      "function _init()\n  x = 0\nend\nfunction _update()\n  x += 1\nend"
    );
  });
});
