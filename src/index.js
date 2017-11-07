import esprima from "esprima";
import transpile from "./transpile";
import { polyfills } from "./constants";

export default function jspicl (source) {
  const tree = esprima.parse(source);
  const lua = transpile(tree.body);

  return `${polyfills}${lua}`;
};
