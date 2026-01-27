import type {BuildResult, Plugin} from "esbuild";
import fs from "node:fs";
import {
  generateCartridgeContent,
  getPicoSectionsFromCartridge
} from "./cartridge.js";
import {getSpritesheetFromImage} from "./spritesheet.js";
import {transpile} from "./transpile.js";

type WatchPluginOptions = {
  spritesheetImagePath: string;
  jsOutput: string;
  output: string;
  onBuildEnd?: (
    cartridgeContent: string,
    transpiledSource: {lua: string; polyfillOutput: string}
  ) => void;
  onBuildError?: (errors: string) => void;
};

export const watchPlugin = (options: WatchPluginOptions): Plugin => ({
  name: "watcher",
  setup(build) {
    build.onEnd(async (result: BuildResult) => {
      const {onBuildEnd, onBuildError, spritesheetImagePath, jsOutput, output} =
        options;

      if (result.errors.length) {
        const errors = result.errors.map((error) => error.text).join("\n");
        onBuildError?.(errors);

        return;
      }

      console.clear();

      const jsContent = fs.readFileSync(jsOutput, "utf-8");
      const transpiledSource = transpile(jsContent, options);
      const cartridgeSections = getPicoSectionsFromCartridge(output);
      const gfxSection = await getSpritesheetFromImage(spritesheetImagePath);

      const cartridgeContent = generateCartridgeContent({
        ...cartridgeSections,
        lua: transpiledSource.lua,
        gfx: gfxSection
      });

      onBuildEnd?.(cartridgeContent, transpiledSource);
    });
  }
});
