const specialCases = {
  undefined: "nil"
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#identifier
export const Identifier = ({ name, value }) => {
  const identifier = (value || name).replace(/\$/g, "_");
  return specialCases[identifier] || identifier;
};
