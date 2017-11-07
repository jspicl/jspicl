import transpile from "../transpile";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#function-declaration
export const FunctionDeclaration = ({ id, body, params }) => {
  const { name = "" } = id || {};
  const argumentList = transpile(params, { arraySeparator: ", " });
  const functionContent = transpile(body);

  return `
function ${name}(${argumentList})
  ${functionContent}
end`;
};
