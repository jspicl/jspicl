import fs from "fs";
import pngjs from "pngjs";
import {PICO8_PALETTE} from "./constants.js";

const spritesheetWidth = 128;
const spritesheetHeight = 128;
const hexBase = 16;
const pixelDataSize = 4; // red + green + blue + alpha

const toClosestColor = (pixels: Buffer) => (_: any, offset: number) => {
  const pixelOffset = offset * pixelDataSize;
  const pixel = {
    r: pixels[pixelOffset],
    g: pixels[pixelOffset + 1],
    b: pixels[pixelOffset + 2]
  };

  let minDistance = Number.MAX_VALUE;
  let closestPaletteColor = 0;
  PICO8_PALETTE.forEach((color: {r: number; g: number; b: number}, i: number) => {
    const diff =
      (color.r - pixel.r) ** 2 +
      (color.g - pixel.g) ** 2 +
      (color.b - pixel.b) ** 2;

    if (diff < minDistance) {
      minDistance = diff;
      closestPaletteColor = i;
    }
  });

  return closestPaletteColor.toString(hexBase);
};

export function getSpritesheetFromImage(imagePath: string) {
  if (!imagePath) {
    throw new Error("Image path is missing");
  }

  const stream = fs.createReadStream(imagePath).pipe(new pngjs.PNG());

  return new Promise((resolve) =>
    stream.on("parsed", () => {
      if (
        stream.width !== spritesheetWidth ||
        stream.height !== spritesheetHeight
      ) {
        throw new Error("The spritesheet must be a 128x128 png image");
      }

      const pixels = new Array(stream.width * stream.height)
        .fill(0)
        .map(toClosestColor(stream.data));

      const pixelsAsString = new Array(stream.height)
        .fill(0)
        .map((_: any, offset) =>
          // cut the strings so we get stacks of 128 characters
          pixels
            .slice(
              offset * spritesheetWidth,
              offset * spritesheetWidth + spritesheetWidth
            )
            .join("")
        )
        .join("\n");

      resolve(pixelsAsString);
    })
  );
}
