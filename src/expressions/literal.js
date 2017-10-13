const specialCases = {
  null: "nil"
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#literal
export const Literal = ({ raw }) => specialCases[raw] || raw;
