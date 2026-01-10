import path from "path";
import type {Options} from "yargs";

export const cliArguments: Record<string, Options> = {
  spritesheetImagePath: {
    description: "Path to a spritesheet",
    type: "string",
    requiresArg: true,
    coerce: (p: string) => path.resolve(p)
  },
  cartridgePath: {
    description: "Path to existing cardridge",
    type: "string",
    requiresArg: true,
    coerce: (p: string) => path.resolve(p)
  },
  jsOutput: {
    description: "Path to JavaScript output",
    type: "string",
    requiresArg: true
  },
  luaOutput: {
    description: "Path to LUA output",
    type: "string",
    requiresArg: true
  },
  customPicoPath: {
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
  },
  config: {
    alias: "c",
    requiresArg: true,
    type: "string",
    coerce: (configPath) => require(path.resolve(configPath)).default
  }
};
