import { transpile } from "../transpile";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#member-expression
export const MemberExpression = ({ computed, object, property }) => {
  const objectName = transpile(object);
  const propertyName = transpile(property);

  return computed ? `${objectName}[${propertyName}]` : `${objectName}.${propertyName}`;
};
