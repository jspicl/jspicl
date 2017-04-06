import traverser from "../traverser";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#function-expression
export const FunctionExpression = ({ id, params, body }) => {
  const { name = "" } = id || {};
  const argumentList = traverser(params, { arraySeparator: ", " });
  const functionContent = traverser(body);
  return `function ${name}(${argumentList})
  ${functionContent}
end`;
};