import esprima from "esprima";
import transpile from "./transpile";
import { polyfills } from "./constants";

export default function jspicl (source) {
  const tree = esprima.parse(source);
  const output = transpile(tree.body);

  return {
    polyfills,
    output
  };
}
