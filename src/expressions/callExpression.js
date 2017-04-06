import traverser from "../traverser";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#call-and-new-expressions
export const CallExpression = ({ callee, arguments: args }) => {
  const argumentList = traverser(args, { arraySeparator: ", " });

  if (callee.object) {
    const objectName = callee.object.name;
    const propertyName = callee.property.name;
    const objectCallName = `${objectName}.${propertyName}`;
    return `${objectCallName}(${argumentList})`;
  }
  else {
    return `${callee.name}(${argumentList})`;
  }
};