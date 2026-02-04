import type {AstNodeVisitor} from "../../types.js";

export const ForStatement: AstNodeVisitor<ForStatement> = (
  {body, init, test, update},
  {transpile}
) =>
  `${transpile(init)}
  while ${transpile(test)} do
    ${transpile(body)}
    ${transpile(update, {arraySeparator: "\n"})}
  end`;
