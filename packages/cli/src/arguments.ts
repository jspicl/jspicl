import path from "node:path";
import type {Options} from "yargs";
import type {LauncherOptions} from "./types.js";

export const cliArguments: Record<keyof LauncherOptions, Options> = {
  spritesheetImagePath: {
    description: "Path to a spritesheet",
    type: "string",
    requiresArg: true,
    demandOption: true,
    coerce: (p: string) => path.resolve(p)
  },
  jsOutput: {
    description: "Custom path to the JavaScript output",
    type: "string",
    requiresArg: true
  },
  luaOutput: {
    description: "Path to LUA output",
    type: "string",
    requiresArg: true
  },
  picoPath: {
    description: "Path to PICO-8 executable",
    type: "string",
    requiresArg: true,
    coerce: (p: string) => path.resolve(p)
  },
  includeBanner: {
    description: "Include jspicl info in code",
    default: true,
    type: "boolean"
  },
  showStats: {
    description: "Display build stats",
    default: true,
    type: "boolean"
  },
  pipeOutputToConsole: {
    description: "Output console.log to terminal",
    type: "boolean"
  },
  reloadOnSave: {
    description: "Re-run cartridge when updated",
    default: true,
    type: "boolean"
  },
  polyfillTransform: {
    description: "Path to a module that exports a transformation method",
    type: "boolean"
  },
  prettify: {
    description: "Format LUA code",
    default: true,
    type: "boolean"
  },
  watch: {
    description: "Reload cartridge on rebuilds",
    type: "boolean"
  }
};
