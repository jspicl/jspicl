import type {AstNodeVisitor} from "../../types.js";

export const SequenceExpression: AstNodeVisitor<SequenceExpression> = (
  {expressions},
  {transpile}
) => transpile(expressions, {arraySeparator: "\n"});
