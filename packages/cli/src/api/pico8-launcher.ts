import path from "path";
import {spawn, exec, ChildProcess} from "child_process";
import {fileURLToPath} from "url";
import {logSuccess, logWarning} from "./logging.js";
import type {LauncherOptions} from "../types.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const osMatrix: Record<string, {execPath: string; reloadCommand?: string}> = {
  win32: {
    execPath: `"C:\\Program Files (x86)\\PICO-8\\pico8.exe"`
  },
  darwin: {
    execPath: "/Applications/PICO-8.app/Contents/MacOS/pico8",
    reloadCommand: `osascript "${path.join(
      __dirname,
      "reload-pico8.applescript"
    )}"`
  },
  linux: {
    execPath: "~/pico-8/pico8"
  }
};

export function createPico8Launcher({
  watch,
  customPicoPath,
  reloadOnSave,
  pipeOutputToConsole
}: LauncherOptions) {
  let picoProcess: ChildProcess | null;
  const {execPath, reloadCommand} = osMatrix[process.platform];

  return (cartridgePath: string) => {
    if (!watch || !cartridgePath) {
      return;
    }

    if (picoProcess) {
      if (!reloadOnSave) {
        return;
      }

      if (reloadCommand) {
        logSuccess("Reloading cartridge in PICO-8");
        exec(reloadCommand);
      } else {
        logWarning(
          "Autoreloading is currently not supported on your OS. Please press Ctrl+R in PICO-8 to see new changes."
        );
      }
    } else {
      logSuccess("Running cartridge in PICO-8");
      // Use customized path if available, otherwise fallback to the default one for the current OS
      picoProcess = launchPico8(
        customPicoPath || execPath,
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
  return spawn(picoPath, ["-run", `"${path.resolve(cartridgePath)}"`], {
    shell: true,
    stdio: pipeOutputToConsole ? "inherit" : "pipe"
  });
}
