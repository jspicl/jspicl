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
    coerce: async (p: string) => {
      const configModule = await import(path.resolve(p));
      return configModule.default;
    }
  }
};
