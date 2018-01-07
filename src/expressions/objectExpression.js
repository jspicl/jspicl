import transpile from "../transpile";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#object-expression
export const ObjectExpression = ({ properties }) =>
  `{
    ${transpile(properties, { arraySeparator: ",\n" })}
  }`;

