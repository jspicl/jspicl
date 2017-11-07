import transpile from "../transpile";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#member-expression
export const MemberExpression = ({ object, property }) => {
  const objectName = transpile(object);
  const propertyName = transpile(property);

  return `${objectName}.${propertyName}`;
};
