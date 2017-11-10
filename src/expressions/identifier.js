const specialCases = {
  undefined: "nil",
  toString: "toString" // Because of fucking misshaps this will have to do
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#identifier
export const Identifier = ({ name, value }) => {
  const identifier = (value || name).replace(/\$/g, "_");
  return specialCases[identifier] || identifier;
};
