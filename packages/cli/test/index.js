import { expect } from "chai";
import fs from "fs";
import plugin from "index";
import { defaultOptions } from "constants";

const defaultUnitTestOptions = {
  ...defaultOptions,
  spritesheetImagePath: `${__dirname}/fixtures/spritesheet.png`,
  includeBanner: false,
  showStats: false,
  reloadOnSave: false
};

const setup = options => plugin({
  ...defaultUnitTestOptions,
  ...options
});

describe("jspicl-cli", () => {
  it("should only overwrite lua section with transpiled code", async () => {
    const { renderChunk } = setup({
      cartridgePath: `${__dirname}/fixtures/replaceLua.txt`
    });

    const result = await renderChunk("var a = 1;");
    expect(result.code).to.equal(fs.readFileSync(`${__dirname}/expected/replaceLua.txt`, "utf8"));
  });

  it("should handle case where cartridge does not end with two newlines", async () => {
    const { renderChunk } = setup({
      cartridgePath: `${__dirname}/fixtures/singleNewline.txt`
    });

    const result = await renderChunk("var a = 1;");
    expect(result.code).to.equal(fs.readFileSync(`${__dirname}/expected/singleNewline.txt`, "utf8"));
  });

  it("includes banner", async () => {
    const { renderChunk } = setup({
      includeBanner: true,
      cartridgePath: `${__dirname}/fixtures/banner.txt`
    });

    const result = await renderChunk("var a = 1;");
    expect(result.code).to.equal(fs.readFileSync(`${__dirname}/expected/banner.txt`, "utf8"));
  });

  it("ignores specific sections from imported cartridge", async () => {
    const { renderChunk } = setup({
      cartridgePath: `${__dirname}/fixtures/ignoreSections.txt`
    });

    const result = await renderChunk("");
    expect(result.code).to.equal(fs.readFileSync(`${__dirname}/expected/ignoreSections.txt`, "utf8"));
  });
});
