import traverser from "../traverser";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#member-expression
export const MemberExpression = ({ object, property }) => {
  const objectName = traverser(object);
  const propertyName = traverser(property);

  return `${objectName}.${propertyName}`;
};