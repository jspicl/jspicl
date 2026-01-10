"use strict";

function _interopDefault(ex) {
  return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
}

var fs = _interopDefault(require("fs"));
var path = _interopDefault(require("path"));
var mkdirp = _interopDefault(require("mkdirp"));
var pngjs = _interopDefault(require("pngjs"));
var child_process = require("child_process");
var jspicl = _interopDefault(require("jspicl"));

const banner = `--[[
generated with jspicl,
a javascript to pico-8 lua
transpiler.

please report any bugs to:
https://github.com/jspicl/jspicl/issues
]]--
`;

const defaultOptions = {
  cartridgePath: "",
  spritesheetImagePath: "",
  includeBanner: true,
  jsOutput: false,
  luaOutput: false,
  polyfillTransform: undefined,
  showStats: true,

  customPicoPath: undefined,
  pipeOutputToConsole: false,
  reloadOnSave: true,

  watch: false
};

const pico8Palette = [
  {
    r: 0,
    g: 0,
    b: 0
  },
  {
    r: 29,
    g: 43,
    b: 83
  },
  {
    r: 126,
    g: 37,
    b: 83
  },
  {
    r: 0,
    g: 135,
    b: 81
  },
  {
    r: 171,
    g: 82,
    b: 54
  },
  {
    r: 95,
    g: 87,
    b: 79
  },
  {
    r: 194,
    g: 195,
    b: 199
  },
  {
    r: 255,
    g: 241,
    b: 232
  },
  {
    r: 255,
    g: 0,
    b: 77
  },
  {
    r: 255,
    g: 163,
    b: 0
  },
  {
    r: 255,
    g: 236,
    b: 39
  },
  {
    r: 0,
    g: 228,
    b: 54
  },
  {
    r: 41,
    g: 173,
    b: 255
  },
  {
    r: 131,
    g: 118,
    b: 156
  },
  {
    r: 255,
    g: 119,
    b: 168
  },
  {
    r: 255,
    g: 204,
    b: 170
  }
];

function generateCartridgeContent({lua = "", gff, gfx, music, map, sfx}) {
  return [
    "pico-8 cartridge // http://www.pico-8.com",
    "version 8",
    `__lua__\n${lua}`,
    gfx && `__gfx__\n${gfx}`,
    gff && `__gff__\n${gff}`,
    map && `__map__\n${map}`,
    sfx && `__sfx__\n${sfx}`,
    music && `__music__\n${music}`,
    "\n"
  ].join("\n");
}

function getCartridgeSections(cartridgePath) {
  const contents = fs.readFileSync(path.resolve(cartridgePath), "utf8");

  const cartridgeSections = {};
  let content, section;

  // Extract the contents of each section
  const regex = /__([a-z]+)__\n([\s\S]*?)(?=\n__\w+__\n|\n(\n|$))/g;
  while (([, section, content] = regex.exec(contents) || "")) {
    cartridgeSections[section] = content;
  }

  return cartridgeSections;
}

// Each token is a word (e.g. variable name) or
// operator. Pairs of brackets, and strings count as 1 token.
// Commas, periods, LOCALs, semi-colons, ENDs, and comments are not counted.
/* eslint-disable no-multi-spaces */
const tokens = [
  '"[^"]*"', // Strings
  "\\d+\\.\\d+", // floating numbers
  "\\w+", // words
  "\\d+", // numbers

  "!=", // inequality
  "==", // comparison
  "\\+=", // incrementing assignment
  "-=", // decrementing assignment
  "<=", // equal or less than
  ">=", // equal or greater than
  "\\.\\.", // string concatenation

  "<", // less than
  ">", // greater than
  "\\+", // addition
  "-", // subtraction
  "\\/", // division
  "\\*", // multiplication
  "=", // equals
  "\\%", // percentage
  "\\(", // paranthesis
  "\\[", // left bracket
  "\\{" // left curly brace
].join("|");

const regex = new RegExp(`(${tokens})`, "gi");

function tokenCounter(luaCode) {
  return (luaCode.match(regex) || []).filter(
    (token) => token !== "local" && token !== "end"
  ).length;
}

const ICONS = {
  info: "\x1b[34mℹ",
  success: "\x1b[32m✔",
  warning: "\x1b[33m⚠",
  error: "\x1b[31m✖"
};

function logToFile(content, filePath) {
  mkdirp.sync(path.dirname(filePath));
  fs.writeFileSync(path.resolve(filePath), content);
}

function logInfo(content) {
  logToConsole(ICONS.info, content);
}

function logSuccess(content) {
  logToConsole(ICONS.success, content);
}

function logWarning(content) {
  logToConsole(ICONS.warning, content);
}

function logToConsole(icon, content) {
  console.log(`${icon} ${content}\x1b[0m`);
}

function logStats(lua, polyfillOutput, code) {
  const tokens = tokenCounter(lua);
  const polyfillTokens = tokenCounter(polyfillOutput);

  const stats = [
    {
      label: "Characters",
      value: lua.length,
      percent: `${~~((lua.length * 100) / 65535)}%`
    },
    {
      label: "Tokens",
      value: `~${tokens}`,
      percent: `${~~((tokens * 100) / 8192)}%`
    },
    {
      label: "  - Polyfills",
      value: `~${polyfillTokens}`
    },
    {
      label: "Filesize",
      value: `${Math.ceil(code.length / 1024)} KB`
    }
  ];

  logInfo("Cartridge Statistics");
  console.log("".padEnd(41, "—"));
  stats.forEach((stats) => {
    const label = `${stats.label}:`.padEnd(20, " ");
    const value = `${stats.value}`.padStart(15, " ");
    const percent = stats.percent
      ? `\x1b[33m${stats.percent}`.padStart(10, " ")
      : "";

    console.log(`${label}${value}${percent}\x1b[0m`);
  });
}

const spritesheetWidth = 128;
const spritesheetHeight = 128;
const hexBase = 16;
const pixelDataSize = 4; // red + green + blue + alpha

const toClosestColor = (pixels) => (unused, offset) => {
  const pixelOffset = offset * pixelDataSize;
  const pixel = {
    r: pixels[pixelOffset],
    g: pixels[pixelOffset + 1],
    b: pixels[pixelOffset + 2] // eslint-disable-line no-magic-numbers
  };

  let minDistance = Number.MAX_VALUE;
  let closestPaletteColor = 0;
  pico8Palette.forEach((color, i) => {
    const diff =
      (color.r - pixel.r) ** 2 +
      (color.g - pixel.g) ** 2 +
      (color.b - pixel.b) ** 2; // eslint-disable-line no-magic-numbers

    if (diff < minDistance) {
      minDistance = diff;
      closestPaletteColor = i;
    }
  });

  return closestPaletteColor.toString(hexBase);
};

function getSpritesheetFromImage(imagePath) {
  if (!imagePath) {
    throw new Error("Image path is missing");
  }

  const stream = fs.createReadStream(imagePath).pipe(new pngjs.PNG());

  return new Promise((
    resolve // eslint-disable-line promise/avoid-new
  ) =>
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
        .map((unused, offset) =>
          pixels
            .slice(
              offset * spritesheetWidth,
              offset * spritesheetWidth + spritesheetWidth
            )
            .join("")
        ) // cut the strings so we get stacks of 128 characters
        .join("\n");

      resolve(pixelsAsString);
    })
  );
}

const pico8PathMap = {
  win32: `"C:\\Program Files (x86)\\PICO-8\\pico8.exe"`, // eslint-disable-line quotes
  darwin: "/Applications/PICO-8.app/Contents/MacOS/pico8",
  linux: "~/pico-8/pico8"
};

function createPico8Launcher({
  watch,
  customPicoPath,
  reloadOnSave,
  pipeOutputToConsole
}) {
  let picoProcess = null;

  return (cartridgePath) => {
    if (!watch || !cartridgePath) {
      return;
    }

    if (picoProcess) {
      if (!reloadOnSave) {
        return;
      }

      if (process.platform === "darwin") {
        // Currently only MacOS supports auto reloading when saving.
        logSuccess("Reloading cartridge in PICO-8");
        child_process.exec(
          `osascript "${path.join(__dirname, "reload-pico8.applescript")}"`
        );
      } else {
        logWarning(
          "Autoreloading is currently only supported on MacOS. Please press Ctrl+R in PICO-8 to see new changes."
        );
      }
    } else {
      logSuccess("Running cartridge in PICO-8");
      // Use customized path if available, otherwise fallback to the default one for the current OS
      const picoPath = customPicoPath || pico8PathMap[process.platform];

      picoProcess = child_process.spawn(
        picoPath,
        ["-run", `"${path.resolve(cartridgePath)}"`],
        {
          shell: true,
          stdio: pipeOutputToConsole ? "inherit" : "pipe"
        }
      );

      picoProcess.on("close", (code) => {
        picoProcess = null;
        code && console.log(`Pico-8 process exited with code ${code}`); // eslint-disable-line no-console
      });
    }
  };
}

function transpile(javascriptCode, options) {
  const {
    includeBanner,
    polyfillTransform,
    jspicl: jspiclOptions = {}
  } = options;
  const jspiclBanner = (includeBanner && `${banner}`) || "";

  const {output, polyfills} = jspicl(javascriptCode, jspiclOptions);
  const polyfillOutput = polyfillTransform
    ? polyfillTransform(polyfills)
    : Object.values(polyfills).join("\n");
  const lua = `${polyfillOutput}${output}`;

  return {
    lua,
    polyfillOutput,
    toString() {
      return `${jspiclBanner}${lua}`;
    }
  };
}

function plugin(customizedOptions) {
  const options = {
    ...defaultOptions,
    ...customizedOptions
  };

  if (!options.cartridgePath) {
    throw new Error("Ensure that 'cartridgePath' property in options is set.");
  }

  if (!options.spritesheetImagePath) {
    throw new Error(
      "Ensure that 'spritesheetImagePath' property in options is set."
    );
  }

  let runOnce = true;
  const runPico = createPico8Launcher(options);

  return {
    name: "jspicl",

    buildStart() {
      if (runOnce) {
        options.watch && logSuccess("Watching source files for changes");
        logSuccess("Building cartridge");
      }

      runOnce = false;
      this.addWatchFile(options.spritesheetImagePath);
    },

    async renderChunk(javascriptCode) {
      const {
        cartridgePath,
        jsOutput,
        luaOutput,
        showStats,
        spritesheetImagePath
      } = options;

      const transpiledSource = transpile(javascriptCode, options);
      const cartridgeSections = getCartridgeSections(cartridgePath);
      const gfxSection = await getSpritesheetFromImage(spritesheetImagePath);

      const code = generateCartridgeContent({
        ...cartridgeSections,
        lua: transpiledSource,
        gfx: gfxSection
      });

      // Statistics
      jsOutput && logToFile(javascriptCode, jsOutput);
      luaOutput && logToFile(transpiledSource.lua, luaOutput);
      showStats &&
        logStats(transpiledSource.lua, transpiledSource.polyfillOutput, code);

      return {
        code
      };
    },

    watchChange() {
      console.clear();
      logSuccess("Change detected, rebuilding cartridge");
    },

    generateBundle({file}) {
      runPico(file);
      options.watch && console.log("\nPress Ctrl+C to stop watching");
    }
  };
}

module.exports = plugin;
