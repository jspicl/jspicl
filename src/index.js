import esprima from "esprima";
import { getRequiredPolyfills } from "./polyfiller";
import prettify from "./prettify";
import createJspiclTranspiler from "./transpile";

const defaultOptions = {
  prettify: true,
  customMappers: undefined
};

export default function jspicl (source, options = defaultOptions) {
  const tree = esprima.parse(source, { loc: true, range: true });

  const transpile = createJspiclTranspiler(options.customMappers);
  let output = transpile(tree.body);

  if (options.prettify) {
    output = prettify(output);
  }

  const polyfills = getRequiredPolyfills(output);
  return {
    polyfills,
    output
  };
}
