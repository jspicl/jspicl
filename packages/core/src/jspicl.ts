import esprima from "esprima";
import {createJspiclTranspiler} from "./transpile.js";
import {getRequiredPolyfills} from "./polyfills/getRequiredPolyfills.js";
import type {Options, Output} from "./types.js";
import {prettify} from "./prettify.js";
import type {ASTNode} from "trastpiler";

const defaultOptions: Options = {
  prettify: true
};

export function jspicl(source: string, overrideOptions?: Options): Output {
  const options = {
    ...defaultOptions,
    ...overrideOptions
  };

  const transpile = createJspiclTranspiler(options.customMappers);
  const {body} = esprima.parseScript(source, {loc: true, range: true});

  let code: string = transpile(body as ASTNode[]);

  if (options.prettify) {
    code = prettify(code);
  }

  return {
    polyfills: getRequiredPolyfills(code),
    code
  };
}
