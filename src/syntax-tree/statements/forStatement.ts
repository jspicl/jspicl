import {AstNodeParser} from "../../types";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#while-statement
export const ForStatement: AstNodeParser = (
  {body, init, test, update},
  {transpile}
) =>
  `${transpile(init)}
  while ${transpile(test)} do
    ${transpile(body)}
    ${transpile(update, {arraySeparator: "\n"})}
  end`;
