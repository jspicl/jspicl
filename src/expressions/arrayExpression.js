import traverser from "../traverser";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#array-expression
export const ArrayExpression = ({ elements }) => {
  return `{
    ${traverser(elements, { arraySeparator: ", " })}
  }`;
};