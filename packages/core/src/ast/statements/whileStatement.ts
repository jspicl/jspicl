import type {AstNodeVisitor} from "../../types.js";

export const WhileStatement: AstNodeVisitor<WhileStatement> = (
  {body, test},
  {transpile}
) =>
  `while ${transpile(test)} do
    ${transpile(body)}
  end`;
