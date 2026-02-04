import type {AstNodeVisitor} from "../../types.js";

export const ArrayExpression: AstNodeVisitor<ArrayExpression> = (
  {elements},
  {transpile}
) =>
  `{
    ${transpile(elements, {arraySeparator: ", "})}
  }`;
