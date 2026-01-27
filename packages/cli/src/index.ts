import yargs from "yargs";
import {hideBin} from "yargs/helpers";

import path from "node:path";

import process from "process";

import esbuild, {type BuildOptions} from "esbuild";
import {cliArguments} from "./arguments.js";
import {logError, logInfo, logStats, logSuccess, logToFile} from "./logging.js";
import type {LauncherOptions} from "./types.js";
import {createPico8Launcher} from "./createPico8Launcher.js";
import {watchPlugin} from "./watchPlugin.js";

function getCommandlineArguments(): {
  input: string;
  output: string;
  options: LauncherOptions;
} {
  const argv = yargs(hideBin(process.argv))
    .options(cliArguments)
    .usage("jspicl-cli input output [<args>]")
    .demandCommand(2, "Please specify an input and output file")
    .help(false)
    .strict()
    .wrap(null)
    .parseSync();

  const {
    _: [input, output],
    ...restArguments
  } = argv;

  return {
    input: path.resolve(input.toString()),
    output: path.resolve(output.toString()),
    options: restArguments as LauncherOptions
  };
}

export async function startBuildService(
  input: string,
  output: string,
  options: LauncherOptions
) {
  console.log(input, options);

  const runPico = createPico8Launcher(options);

  const jsOutput = path.resolve(options.jsOutput || "build/jsOutput.js");

  const config: BuildOptions = {
    entryPoints: [input],
    bundle: true,
    platform: "neutral",
    treeShaking: false,
    format: "esm",
    outfile: jsOutput,
    plugins: [
      watchPlugin({
        spritesheetImagePath: options.spritesheetImagePath,
        jsOutput,
        output,

        onBuildError: (errors) => {
          logError(`Build failed with errors:\n${errors}`);
        },

        onBuildEnd: (cartridgeContent, transpiledSource) => {
          options.luaOutput &&
            logToFile(transpiledSource.lua, options.luaOutput);
          logToFile(cartridgeContent, output);

          logSuccess("Build completed");
          runPico(output);

          // Statistics
          options.showStats &&
            logStats(
              transpiledSource.lua,
              transpiledSource.polyfillOutput,
              cartridgeContent
            );
        }
      })
    ]
  };

  if (options.watch) {
    const context = await esbuild.context(config);
    await context.watch();
  } else {
    await esbuild.build(config);
  }
}

async function runCLI() {
  const {input, output, options} = getCommandlineArguments();

  process.on("SIGINT", () => {
    logInfo("Shutting down...");
    process.exit(0);
  });

  try {
    await startBuildService(input, output, options);
  } catch (error) {
    logError(String(error));
  }
}

runCLI();
