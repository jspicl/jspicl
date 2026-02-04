import fs from "node:fs";
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
    coerce: (p: string) => {
      const content = fs.readFileSync(path.resolve(p), "utf-8");
      return JSON.parse(content);
    }
  }
};
