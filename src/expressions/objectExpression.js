import traverser from "../traverser";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#object-expression
export const ObjectExpression = ({ properties }) => {
  return `{
    ${traverser(properties, { arraySeparator: ",\n" })}
  }`;
};