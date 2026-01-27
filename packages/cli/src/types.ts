export interface PicoSections extends Record<string, string> {
  lua: string;
  gff: string;
  gfx: string;
  music: string;
  map: string;
  sfx: string;
}

export interface LauncherOptions {
  picoPath?: string;
  includeBanner?: boolean;
  jsOutput?: string;
  luaOutput?: string;
  pipeOutputToConsole?: boolean;
  polyfillTransform?: string;
  prettify?: boolean;
  reloadOnSave?: boolean;
  showStats?: boolean;
  spritesheetImagePath: string;
  watch?: boolean;
}
