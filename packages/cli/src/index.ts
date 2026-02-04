import yargs from "yargs";
import {hideBin} from "yargs/helpers";

import path from "node:path";

import process from "process";

import esbuild, {type BuildOptions} from "esbuild";
import {cliArguments} from "./arguments.js";
import {logError, logInfo, logStats, logSuccess, logToFile} from "./logging.js";
import type {CommandLineOptions} from "./types.js";
import {createPico8Launcher} from "./createPico8Launcher.js";
import {watchPlugin} from "./watchPlugin.js";

function getCommandlineArguments(): {
  input: string;
  output: string;
  options: CommandLineOptions;
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
    options: restArguments as CommandLineOptions
  };
}

export async function startBuildService(
  input: string,
  output: string,
  cliOptions: CommandLineOptions
) {
  const {watch, config} = cliOptions;
  const runPico = createPico8Launcher(
    watch,
    config.picoPath,
    config.reloadOnSave,
    config.pipeOutputToConsole
  );

  const jsOutput = path.resolve(config.jsOutput || "build/jsOutput.js");

  const buildConfig: BuildOptions = {
    entryPoints: [input],
    bundle: true,
    platform: "neutral",
    treeShaking: false,
    format: "esm",
    outfile: jsOutput,
    plugins: [
      watchPlugin({
        config,
        output,

        onBuildError: (errors) => {
          logError(`Build failed with errors:\n${errors}`);
        },

        onBuildEnd: (cartridgeContent, transpiledSource) => {
          config.luaOutput && logToFile(transpiledSource.lua, config.luaOutput);
          logToFile(cartridgeContent, output);

          logSuccess("Build completed");
          runPico(output);

          // Statistics
          config.showStats &&
            logStats(
              transpiledSource.lua,
              transpiledSource.polyfillOutput,
              cartridgeContent
            );
        }
      })
    ]
  };

  if (watch) {
    const context = await esbuild.context(buildConfig);
    await context.watch();
  } else {
    await esbuild.build(buildConfig);
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
