import type {BuildResult, Plugin} from "esbuild";
import fs from "node:fs";
import {
  generateCartridgeContent,
  getPicoSectionsFromCartridge
} from "../cartridge.js";
import {getSpritesheetFromImage} from "../spritesheet.js";
import {transpile} from "../transpile.js";
import type {Config} from "../types.js";
import {logToFile} from "../logging.js";

type BuildPluginOptions = {
  config: Config;
  output: string;
  onBuildEnd?: (
    cartridgeContent: string,
    transpiledSource: {lua: string; polyfillOutput: string}
  ) => void;
  onBuildError?: (errors: string) => void;
};

export const buildPlugin = (options: BuildPluginOptions): Plugin => ({
  name: "buildPlugin",
  setup(build) {
    build.onEnd(async (result: BuildResult) => {
      const {onBuildEnd, onBuildError, config, output} = options;

      const {jsOutput, spritesheetImagePath} = config;

      if (result.errors.length) {
        const errors = result.errors.map((error) => error.text).join("\n");
        onBuildError?.(errors);

        return;
      }

      // console.clear();

      const jsContent = fs.readFileSync(jsOutput, "utf-8");
      const transpiledSource = transpile(jsContent, config);

      const cartridgeSections = getPicoSectionsFromCartridge(output);
      const gfxSection = await getSpritesheetFromImage(spritesheetImagePath);

      const cartridgeContent = generateCartridgeContent({
        ...cartridgeSections,
        lua: transpiledSource.lua,
        gfx: gfxSection
      });

      logToFile(cartridgeContent, output);

      onBuildEnd?.(cartridgeContent, transpiledSource);
    });
  }
});
