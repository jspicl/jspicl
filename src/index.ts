import * as esprima from "esprima";
import {createJspiclTranspiler} from "./transpile";
import {getRequiredPolyfills} from "./polyfills/get-required-polyfills";
import {JspiclOptions} from "./types";
import {prettify} from "./prettify";

export * from "./types";

const defaultOptions: JspiclOptions = {
  prettify: true
};

export function jspicl(source: string, overrideOptions?: JspiclOptions) {
  const options = {
    ...defaultOptions,
    ...overrideOptions
  };

  const transpile = createJspiclTranspiler(options.customMappers);
  const {body} = esprima.parseScript(source, {loc: true, range: true});

  let code: string = transpile(body);

  if (options.prettify) {
    code = prettify(code);
  }

  return {
    polyfills: getRequiredPolyfills(code),
    code
  };
}
