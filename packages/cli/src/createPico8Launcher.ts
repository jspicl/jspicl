import {ChildProcess, spawn} from "child_process";
import fs from "node:fs";
import path from "node:path";
import untildify from "untildify";
import {HOTRELOAD_ID} from "./constants.js";
import {logSuccess, logWarning} from "./logging.js";
import type {PicoOptions} from "./types.js";

const osMatrix: Record<string, {execPath: string; cartDataPath?: string}> = {
  win32: {
    execPath: `"C:\\Program Files (x86)\\PICO-8\\pico8.exe"`
  },
  darwin: {
    execPath: "/Applications/PICO-8.app/Contents/MacOS/pico8",
    cartDataPath: untildify("~/Library/Application Support/pico-8/cdata/")
  },
  linux: {
    execPath: untildify("~/pico-8/pico8")
  }
};

export function createPico8Launcher(
  picoOptions?: PicoOptions,
  pipeOutputToConsole?: boolean
) {
  let picoProcess: ChildProcess | null;
  const {execPath, cartDataPath} = {
    ...osMatrix[process.platform],
    ...picoOptions
  };

  return (cartridgePath: string) => {
    if (!cartridgePath) {
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

      fs.writeFileSync(
        path.resolve(cartDataPath, `${HOTRELOAD_ID}.p8d.txt`),
        "1"
      );
      logSuccess("Reloading cartridge in PICO-8");
    } else {
      logSuccess("Running cartridge in PICO-8");

      picoProcess = launchPico8(execPath, cartridgePath, pipeOutputToConsole);

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
  const resolvedPath = path.resolve(cartridgePath);
  return spawn(
    picoPath,
    [
      "-run",
      `"${resolvedPath}"`,
      "-root_path",
      `"${path.dirname(resolvedPath)}"`
    ],
    {
      shell: true,
      stdio: pipeOutputToConsole ? "inherit" : "pipe"
    }
  );
}
