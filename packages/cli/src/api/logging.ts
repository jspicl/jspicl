// import fs from "fs";
// import path from "path";
// import mkdirp from "mkdirp";
// import {tokenCounter} from "./token-counter";

enum ICONS {
  info = "\x1b[34mℹ",
  success = "\x1b[32m✔",
  warning = "\x1b[33m⚠",
  error = "\x1b[31m✖"
}

// export function logToFile(content: string, filePath: string) {
//   mkdirp.sync(path.dirname(filePath));
//   fs.writeFileSync(path.resolve(filePath), content);
// }

export function logInfo(content: string) {
  logToConsole(content, ICONS.info);
}

export function logSuccess(content: string) {
  logToConsole(content, ICONS.success);
}

export function logWarning(content: string) {
  logToConsole(content, ICONS.warning);
}

export function logError(content: string) {
  logToConsole(content, ICONS.error);
}

function logToConsole(content: string, icon: string) {
  console.log(`${icon} ${content}\x1b[0m`);
}

// export function logStats(lua: string, polyfillOutput: string, code: string) {
//   const tokens = tokenCounter(lua);
//   const polyfillTokens = tokenCounter(polyfillOutput);

//   logInfo("Cartridge Statistics");
//   console.log("".padEnd(41, "—"));

//   const stats = [
//     {
//       label: "Characters",
//       value: lua.length,
//       percent: `${~~((lua.length * 100) / 65535)}%`
//     },
//     {
//       label: "Tokens",
//       value: `~${tokens}`,
//       percent: `${~~((tokens * 100) / 8192)}%`
//     },
//     {
//       label: "  - Polyfills",
//       value: `~${polyfillTokens}`
//     },
//     {
//       label: "Filesize",
//       value: `${Math.ceil(code.length / 1024)} KB`
//     }
//   ];

//   stats.forEach((stats) => {
//     const label = `${stats.label}:`.padEnd(20, " ");
//     const value = `${stats.value}`.padStart(15, " ");
//     const percent = stats.percent
//       ? `\x1b[33m${stats.percent}`.padStart(10, " ")
//       : "";

//     console.log(`${label}${value}${percent}\x1b[0m`);
//   });
// }
