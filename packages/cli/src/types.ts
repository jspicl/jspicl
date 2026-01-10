export interface PicoSections extends Record<string, string | undefined> {
  lua: string;
  gff?: string;
  gfx?: string;
  music?: string;
  map?: string;
  sfx?: string;
}

export interface LauncherOptions {
  watch?: boolean;
  customPicoPath?: string;
  reloadOnSave?: boolean;
  pipeOutputToConsole?: boolean;
}
