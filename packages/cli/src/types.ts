import type {Options as JspiclOptions} from "@jspicl/core/types";

export interface PicoSections extends Record<string, string> {
  lua: string;
  gff: string;
  gfx: string;
  music: string;
  map: string;
  sfx: string;
}

export interface Config {
  spritesheetImagePath: string;
  jsOutput: string;
  picoPath?: string;
  includeBanner?: boolean;
  luaOutput?: string;
  pipeOutputToConsole?: boolean;
  polyfillTransform?: (polyfills: Record<string, string>) => string;
  reloadOnSave?: boolean;
  showStats?: boolean;
  jspicl?: JspiclOptions;
}
export interface CommandLineOptions {
  watch: boolean;
  config: Config;
}
