import { normalizeName } from "../helpers";

const specialCases = {
  undefined: "nil"
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#identifier
export const Identifier = ({ name, value }) => {
  const identifier = normalizeName(value || name);
  return specialCases.hasOwnProperty(identifier) && specialCases[identifier] || identifier;
};
