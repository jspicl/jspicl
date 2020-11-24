import {normalizeName} from "../../helpers";
import {AstNodeParser} from "../../types";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#function-declaration
export const FunctionDeclaration: AstNodeParser = (
  {id, body, params},
  {transpile}
) => {
  const {name = ""} = id || {};
  const argumentList = transpile(params, {arraySeparator: ", "});
  const functionContent = transpile(body);

  return `function ${normalizeName(name)}(${argumentList})
    ${functionContent}
  end`;
};

FunctionDeclaration.scopeBoundary = true;
