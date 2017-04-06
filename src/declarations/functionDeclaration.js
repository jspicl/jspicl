import traverser from "../traverser";

export const FunctionDeclaration = ({ id, body, params }) => {
  const { name = "" } = id || {};
  const argumentList = traverser(params, { arraySeparator: ", " });
  const functionContent = traverser(body);
  return `
function ${name}(${argumentList})
  ${functionContent}
end`;
};