import type {Plugin, PluginBuild} from "esbuild";
import {createPico8Launcher} from "../createPico8Launcher.js";
import type {Config} from "../types.js";

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

    build.onEnd(() => {
      const {output} = options;
      runPico(output);
    });
  }
});
