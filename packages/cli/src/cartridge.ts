import fs from "fs";
import type {PicoSections} from "./types.js";

export function generateCartridgeContent({
  lua = "",
  gff = "",
  gfx = "",
  music = "",
  map = "",
  sfx = ""
}: Partial<PicoSections> = {}) {
  return [
    "pico-8 cartridge // http://www.pico-8.com",
    "version 42",
    lua && `__lua__\n${lua}`,
    gfx && `__gfx__\n${gfx}`,
    gff && `__gff__\n${gff}`,
    map && `__map__\n${map}`,
    sfx && `__sfx__\n${sfx}`,
    music && `__music__\n${music}`,
    "\n"
  ]
    .filter(Boolean)
    .join("\n")
    .replace(/\n\n/, "\n");
}

export function getPicoSectionsFromCartridge(
  cartridgePath: string
): PicoSections {
  try {
    const content = fs.existsSync(cartridgePath)
      ? fs.readFileSync(cartridgePath, "utf8")
      : "";
    return parsePico8Cartridge(content);
  } catch (error) {
    throw new Error(
      `Failed to read cartridge at ${cartridgePath}: ${(error as Error).message}`
    );
  }
}

function parsePico8Cartridge(content: string): PicoSections {
  const cartridgeSections: PicoSections = {
    lua: "",
    gff: "",
    gfx: "",
    music: "",
    map: "",
    sfx: ""
  };

  // Extract the contents of each section
  const regex = /__(\w+)__\n([\s\S]*?)(?=\n__\w+__\n|\n(\n|$))/g;
  // /__(\w+)__\r?\n([\s\S]*?)(?=__\w+__|\s*$)/g;

  let result;
  while ((result = regex.exec(content)) !== null) {
    const [, section, content] = result;
    cartridgeSections[section as keyof PicoSections] = content;
  }

  return cartridgeSections;
}
