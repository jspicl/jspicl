#!/usr/bin/env node
import yargs from "yargs";
import {hideBin} from "yargs/helpers";

import process from "process";

import esbuild, {type BuildContext} from "esbuild";
import {cliArguments} from "./launcher/cli-arguments.js";
import {watchPlugin} from "./watch-plugin.js";
import debounce from "lodash.debounce";
import {logSuccess} from "./api/logging.js";
import {createPico8Launcher} from "./api/pico8-launcher.js";

function getCommandlineArguments() {
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

  return {input: String(input), output: String(output), options: restArguments};
}

export async function startBuildService(
  input: string,
  output: string,
  options: any
) {
  console.log(options);

  const runPico = createPico8Launcher(options);

  const ctx = await esbuild.context({
    entryPoints: [input],
    bundle: true,
    platform: "node",
    format: "esm",
    outfile: "build/jsOutput.js",
    footer: {js: "_init();_update();_update60();_draw();"},
    plugins: options.watch
      ? [
          watchPlugin(input, {
            onChange: () => {
              logSuccess("Change detected, rebuilding cartridge");
              rebuild();
            }
          }),

          watchPlugin("build/jsOutput.js", {
            onChange: (path: string) => {
              console.log(
                "Output path changed, launching pico8 transpilation",
                path,
                output
              );
              runPico(path);
            }
          })
        ]
      : undefined
  });

  const rebuild = debounce(async () => ctx.rebuild());

  // Initial build
  await ctx.rebuild();

  return ctx;
}

export async function runCLI() {
  const {input, output, options} = getCommandlineArguments();

  let ctx: BuildContext | undefined;

  process.on("SIGINT", () => {
    console.log("SIGINT CALLED");
    ctx?.dispose();
    process.exit(0);
  });

  try {
    ctx = await startBuildService(input, output, options);
  } catch (error) {
    console.error("Error", error);
    ctx?.dispose();
  }
}
