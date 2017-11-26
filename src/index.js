import esprima from "esprima";
import transpile from "./transpile";
import { getRequiredPolyfills } from "./polyfiller";

export default function jspicl (source) {
  const tree = esprima.parse(source, { loc: true, range: true });

  const output = transpile(tree.body);
  const polyfills = getRequiredPolyfills(output);

  return {
    polyfills,
    output
  };
}
