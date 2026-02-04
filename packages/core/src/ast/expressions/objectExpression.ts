import type {AstNodeVisitor} from "../../types.js";

export const ObjectExpression: AstNodeVisitor<ObjectExpression> = (
  {properties},
  {transpile}
) =>
  `{
    ${transpile(properties, {arraySeparator: ",\n"})}
  }`;
