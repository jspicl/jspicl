import type {AstNodeVisitor} from "../../types.js";

export const DoWhileStatement: AstNodeVisitor<DoWhileStatement> = (
  {body, test},
  {transpile}
) =>
  `repeat
    ${transpile(body)}
  until not (${transpile(test)})`;
