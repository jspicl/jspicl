import path from "node:path";
import type {Options} from "yargs";
import type {CommandLineOptions, Config} from "./types.js";

export const cliArguments: Record<keyof CommandLineOptions, Options> = {
  watch: {
    description: "Reload cartridge on rebuilds",
    type: "boolean",
    default: false,
    alias: "w"
  },
  config: {
    description: "Path to a config file",
    type: "string",
    alias: "c",
    requiresArg: true,
    default: {
      jsOutput: "build/jsOutput.js"
    } as Config,
    coerce: async (configPath: string) => {
      const configDir = path.dirname(configPath);
      const configModule = await import(path.resolve(configPath));

      const config: Config = configModule.default;

      config.jsOutput = path.resolve(configDir, config.jsOutput);
      if (config.luaOutput) {
        config.luaOutput = path.resolve(configDir, config.luaOutput);
      }

      if (config.spritesheetImagePath) {
        config.spritesheetImagePath = path.resolve(
          configDir,
          config.spritesheetImagePath
        );
      }

      return config;
    }
  }
};
