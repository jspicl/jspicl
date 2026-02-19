import type {Plugin, PluginBuild} from "esbuild";
import path from "node:path";
import fs from "node:fs";
import {createPico8Launcher} from "../createPico8Launcher.js";
import type {Config} from "../types.js";
import {logToFile} from "../logging.js";
import {HOTRELOAD_ID} from "../constants.js";

type HotReloadPluginOptions = {
  config: Config;
  output: string;
};

export const hotReloadPlugin = (options: HotReloadPluginOptions): Plugin => ({
  name: "hotReloadPlugin",
  setup: function (build: PluginBuild): void | Promise<void> {
    const runPico = createPico8Launcher(
      options.config.picoOptions,
      options.config.pipeOutputToConsole
    );

    build.onEnd(async () => {
      const {output} = options;

      // Brute force hotreload injection
      const hotReloadScript = `
local shouldreload = false
function hotreload()
  cartdata("${options.config.picoOptions?.cartDataId || HOTRELOAD_ID}")
  shouldreload=peek(0x5eff - 3) == 1
  if shouldreload then
    poke(0x5eff - 3, 0)
    load("${path.basename(output)}")
  end
end`;

      const content = fs.readFileSync(output, "utf-8");

      const newContent = content
        .replace("__lua__", `__lua__\n${hotReloadScript}`)
        .replace("function _draw()", `function _draw()\n  hotreload()`);

      logToFile(newContent, output);

      runPico(output);
    });
  }
});
