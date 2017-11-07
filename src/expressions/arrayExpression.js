import transpile from "../transpile";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#array-expression
export const ArrayExpression = ({ elements }) => {
  return `{
    ${transpile(elements, { arraySeparator: ", " })}
  }`;
};
