import yargs from "yargs";
import {hideBin} from "yargs/helpers";

import path from "node:path";

import process from "process";

import esbuild, {type BuildOptions, type Plugin} from "esbuild";
import {cliArguments} from "./arguments.js";
import {logError, logInfo, logStats, logSuccess, logToFile} from "./logging.js";
import type {CommandLineOptions} from "./types.js";
import {buildPlugin} from "./esbuildPlugins/buildPlugin.js";
import {hotReloadPlugin} from "./esbuildPlugins/hotReloadPlugin.js";
import chokidar from "chokidar";

async function getCommandlineArguments(): Promise<{
  input: string;
  output: string;
  options: CommandLineOptions;
}> {
  const argv = await yargs(hideBin(process.argv))
    .options(cliArguments)
    .usage("jspicl-cli input output [<args>]")
    .demandCommand(2, "Please specify an input and output file")
    .help(false)
    .strict()
    .wrap(null)
    .parseAsync();

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
  const {jsOutput} = config;

  const buildConfig: BuildOptions = {
    entryPoints: [input],
    bundle: true,
    platform: "neutral",
    treeShaking: false,
    minify: config.minify,
    format: "esm",
    outfile: jsOutput,
    plugins: [
      buildPlugin({
        config,
        output,

        onBuildError: (errors) => {
          logError(`Build failed with errors:\n${errors}`);
        },

        onBuildEnd: (cartridgeContent, transpiledSource) => {
          logSuccess("Build completed");

          config.luaOutput && logToFile(transpiledSource.lua, config.luaOutput);

          // Statistics
          config.showStats &&
            logStats(
              transpiledSource.lua,
              transpiledSource.polyfillOutput,
              cartridgeContent
            );
        }
      }),
      watch &&
        hotReloadPlugin({
          config,
          output
        })
    ].filter(Boolean) as Plugin[]
  };

  if (watch) {
    const context = await esbuild.context(buildConfig);

    // Rebuild if the spritesheet is changed, since it's not part of the esbuild graph
    chokidar.watch(config.spritesheetImagePath).on("change", async () => {
      await context.rebuild();
    });

    await context.watch();
  } else {
    await esbuild.build(buildConfig);
  }
}

async function runCLI() {
  const {input, output, options} = await getCommandlineArguments();

  process.on("SIGINT", () => {
    logInfo("Shutting down...");
    process.exit(0);
  });

  try {
    await startBuildService(input, output, options);
  } catch (error) {
    logError(String(error));
    throw error;
  }
}

runCLI();
