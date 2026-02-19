import type {Options} from "yargs";
import type {
  CommandLineOptions,
  Config,
  PicoOptionsMatrix,
  SupportedPlatforms
} from "./types.js";
import {HOTRELOAD_ID} from "./constants.js";
import {resolvePath} from "./utils.js";
import merge from "lodash.merge";

const osMatrix: PicoOptionsMatrix = {
  win32: {
    executablePath: `"C:\\Program Files (x86)\\PICO-8\\pico8.exe"`
  },
  darwin: {
    executablePath: "/Applications/PICO-8.app/Contents/MacOS/pico8",
    cartDataPath: "~/Library/Application Support/pico-8/cdata/"
  },
  linux: {
    executablePath: "~/pico-8/pico8",
    cartDataPath: "~/.lexaloffle/pico-8/cdata/"
  }
};

const platform = process.platform as SupportedPlatforms;

const defaultConfig: Partial<Config> = {
  jsOutput: "build/jsOutput.js",
  picoOptions: {
    cartDataId: HOTRELOAD_ID,
    cartDataPath: osMatrix[platform].cartDataPath,
    executablePath: osMatrix[platform].executablePath
  }
};

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
    coerce: async (configPath: string) => {
      const configModule = await import(resolvePath(configPath));
      const config: Config = merge({}, defaultConfig, configModule.default);

      config.jsOutput = resolvePath(config.jsOutput);

      if (config.luaOutput) {
        config.luaOutput = resolvePath(config.luaOutput);
      }

      if (config.spritesheetImagePath) {
        config.spritesheetImagePath = resolvePath(config.spritesheetImagePath);
      }

      if (config.picoOptions?.cartDataPath) {
        config.picoOptions.cartDataPath = resolvePath(
          config.picoOptions.cartDataPath
        );
      }

      return config;
    }
  }
};
