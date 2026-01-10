import {normalizeName} from "../../helpers/normalizeName.js";
import type {AstNodeVisitor} from "../../types.js";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#function-declaration
export const FunctionDeclaration: AstNodeVisitor = (
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
