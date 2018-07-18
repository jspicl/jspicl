import esprima from "esprima";
import { transpile } from "./transpile";
import { getRequiredPolyfills } from "./polyfiller";
import prettify from "./prettify";

const defaultOptions = {
  prettify: true
};

export default function jspicl (source, options = defaultOptions) {
  const tree = esprima.parse(source, { loc: true, range: true });

  let output = transpile(tree.body);
  const polyfills = getRequiredPolyfills(output);

  if (options.prettify) {
    output = prettify(output);
  }

  return {
    polyfills,
    output
  };
}
