import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";
import {describe, it, expect} from "vitest";
import {
  generateCartridgeContent,
  getPicoSectionsFromCartridge
} from "../src/cartridge.js";
import {transpile} from "../src/transpile.js";
import {convertSpritesheetToGfxString} from "../src/spritesheet.js";
import type {Config} from "../src/types.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const defaultUnitTestOptions: Config = {
  spritesheetImagePath: path.join(__dirname, "fixtures/spritesheet.png"),
  jsOutput: "build/game.js",
  includeBanner: false,
  showStats: false,
  reloadOnSave: false
};

// Compatibility layer to mimic the old plugin API
const setup = (options: Partial<Config> & {cartridgePath?: string}) => {
  const config = {
    ...defaultUnitTestOptions,
    ...options
  };

  return {
    async renderChunk(jsCode: string) {
      const {lua} = transpile(jsCode, config);

      const sections = options.cartridgePath
        ? getPicoSectionsFromCartridge(options.cartridgePath)
        : {lua: "", gfx: "", gff: "", map: "", sfx: "", music: ""};

      const gfx = config.spritesheetImagePath
        ? await convertSpritesheetToGfxString(config.spritesheetImagePath)
        : sections.gfx;

      const code = generateCartridgeContent({
        ...sections,
        lua,
        gfx
      });

      return {code};
    }
  };
};

describe("jspicl-cli", () => {
  it("should only overwrite lua section with transpiled code", async () => {
    const {renderChunk} = setup({
      cartridgePath: path.join(__dirname, "fixtures/replaceLua.txt")
    });

    const result = await renderChunk("var a = 1;");
    expect(result.code).toEqual(
      fs.readFileSync(path.join(__dirname, "expected/replaceLua.txt"), "utf8")
    );
  });

  it("should handle case where cartridge does not end with two newlines", async () => {
    const {renderChunk} = setup({
      cartridgePath: path.join(__dirname, "fixtures/singleNewline.txt")
    });

    const result = await renderChunk("var a = 1;");
    expect(result.code).toEqual(
      fs.readFileSync(path.join(__dirname, "expected/singleNewline.txt"), "utf8")
    );
  });

  it("includes banner", async () => {
    const {renderChunk} = setup({
      includeBanner: true,
      cartridgePath: path.join(__dirname, "fixtures/banner.txt")
    });

    const result = await renderChunk("var a = 1;");
    expect(result.code).toEqual(
      fs.readFileSync(path.join(__dirname, "expected/banner.txt"), "utf8")
    );
  });

  it("ignores specific sections from imported cartridge", async () => {
    const {renderChunk} = setup({
      cartridgePath: path.join(__dirname, "fixtures/ignoreSections.txt")
    });

    const result = await renderChunk("");
    expect(result.code).toEqual(
      fs.readFileSync(
        path.join(__dirname, "expected/ignoreSections.txt"),
        "utf8"
      )
    );
  });
});
