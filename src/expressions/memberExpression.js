import transpile from "../transpile";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#member-expression
export const MemberExpression = ({ object, property }) =>
  `${transpile(object)}.${transpile(property)}`;
