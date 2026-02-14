import {ChildProcess, spawn} from "child_process";
import fs from "node:fs";
import path from "node:path";
import untildify from "untildify";
import {logError, logSuccess, logWarning} from "./logging.js";
import type {
  PicoOptions,
  PicoOptionsMatrix,
  SupportedPlatforms
} from "./types.js";
import {EMPTY_CART_DATA} from "./constants.js";

const osMatrix: PicoOptionsMatrix = {
  win32: {
    executablePath: `"C:\\Program Files (x86)\\PICO-8\\pico8.exe"`
  },
  darwin: {
    executablePath: "/Applications/PICO-8.app/Contents/MacOS/pico8",
    cartDataPath: untildify("~/Library/Application Support/pico-8/cdata/")
  },
  linux: {
    executablePath: untildify("~/pico-8/pico8"),
    cartDataPath: untildify("~/.lexaloffle/pico-8/cdata/")
  }
};

export function createPico8Launcher(
  picoOptions?: PicoOptions,
  pipeOutputToConsole?: boolean
) {
  const platform = process.platform as SupportedPlatforms;
  let picoProcess: ChildProcess | null;
  const {
    executablePath,
    cartDataPath,
    cartDataId = "jspicl_hotreload"
  } = {
    ...osMatrix[platform],
    ...picoOptions
  };

  return (cartridgePath: string) => {
    if (!executablePath) {
      logError(
        `PICO-8 executable not found. Please install PICO-8 or set the executablePath option. Default path for your OS: ${osMatrix[platform].executablePath}`
      );
      return;
    }

    if (!cartridgePath) {
      logError("No cartridge path provided");
      return;
    }

    if (picoProcess) {
      if (!cartDataPath) {
        logWarning(
          "Autoreloading is currently not supported on your OS. Please press Ctrl+R in PICO-8 to see the new changes."
        );
        return;
      }

      if (!fs.existsSync(cartDataPath)) {
        logWarning(
          "Unable to reload cartridge in PICO-8 since the cartridge data path does not exist or is inaccessible. Please press Ctrl+R in PICO-8 to see the new changes."
        );
        return;
      }

      const cartDataFilePath = path.resolve(
        cartDataPath,
        `${cartDataId}.p8d.txt`
      );

      const cartDataContent = fs.existsSync(cartDataFilePath)
        ? fs.readFileSync(
            path.resolve(cartDataPath, `${cartDataId}.p8d.txt`),
            "utf-8"
          )
        : EMPTY_CART_DATA;

      fs.writeFileSync(
        cartDataFilePath,
        cartDataContent.slice(0, 64 * 8 + 8 - 2) + "1"
      );
      logSuccess("Reloading cartridge in PICO-8");
    } else {
      logSuccess("Running cartridge in PICO-8");

      picoProcess = launchPico8(
        executablePath,
        cartridgePath,
        pipeOutputToConsole
      );

      picoProcess.on("close", (errorCode) => {
        if (errorCode !== 0) {
          logWarning(`PICO-8 process exited with code ${errorCode}`);
        }
        picoProcess = null;
      });
    }
  };
}

function launchPico8(
  picoPath: string,
  cartridgePath: string,
  pipeOutputToConsole?: boolean
) {
  return spawn(
    picoPath,
    [
      "-run",
      `"${cartridgePath}"`,
      "-root_path",
      `"${path.dirname(cartridgePath)}"`
    ],
    {
      shell: true,
      stdio: pipeOutputToConsole ? "inherit" : "pipe"
    }
  );
}
