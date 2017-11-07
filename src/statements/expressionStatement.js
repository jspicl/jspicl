import transpile from "../transpile";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#expression-statement
export const ExpressionStatement = ({ expression }) => {
  return transpile(expression);
};
