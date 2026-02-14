import type {Options as JspiclOptions} from "@jspicl/core/types";

export interface PicoSections extends Record<string, string> {
  lua: string;
  gff: string;
  gfx: string;
  music: string;
  map: string;
  sfx: string;
}

export interface PicoOptions {
  executablePath?: string;
  cartDataPath?: string;
  cartDataId?: string;
}

export type SupportedPlatforms = "win32" | "darwin" | "linux";
export type PicoOptionsMatrix = Record<SupportedPlatforms, PicoOptions>;

export interface Config {
  spritesheetImagePath: string;
  jsOutput: string;
  includeBanner?: boolean;
  luaOutput?: string;
  minify?: boolean; // Highly experimental
  pipeOutputToConsole?: boolean;
  polyfillTransform?: (polyfills: Record<string, string>) => string;
  showStats?: boolean;
  picoOptions?: PicoOptions;
  jspiclOptions?: JspiclOptions;
}

export interface CommandLineOptions {
  watch: boolean;
  config: Config;
}
