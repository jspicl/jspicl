import esprima from "esprima";
import traverser from "./traverser";
import { polyfills } from "./constants";

export default (source) => {
  const tree = esprima.parse(source);
  const lua = traverser(tree.body);

  return `${polyfills}${lua}`;
};