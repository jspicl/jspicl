import transpile from "../transpile";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#function-expression
export const FunctionExpression = ({ id, params, body }) => {
  const { name = "" } = id || {};
  const argumentList = transpile(params, { arraySeparator: ", " });
  const functionContent = transpile(body);

  return `function ${name}(${argumentList})
    ${functionContent}
  end`;
};
