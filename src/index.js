import esprima from "esprima";
import traverser from "./traverser";

export default (source) => {
  const tree = esprima.parse(source);
  return traverser(tree.body);
};