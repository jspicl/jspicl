import {jspicl} from "@jspicl/core";
import {JSPICL_BANNER} from "./constants.js";
import type {Config} from "./types.js";

export function transpile(javascriptCode: string, config: Config) {
  const {includeBanner, polyfillTransform, jspiclOptions} = config;

  const jspiclBanner = (includeBanner && `${JSPICL_BANNER}`) || "";

  const {code, polyfills} = jspicl(javascriptCode, jspiclOptions);
  const polyfillOutput = polyfillTransform
    ? polyfillTransform(polyfills)
    : Object.values(polyfills).join("\n");

  const lua = `${jspiclBanner}${polyfillOutput}${code}`;

  return {
    lua,
    polyfillOutput
  };
}
