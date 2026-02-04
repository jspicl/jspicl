import type {AstNodeVisitor} from "../../types.js";

export const MethodDefinition: AstNodeVisitor<MethodDefinition> = (
  {key, value},
  {transpile}
) => `${transpile(key)} = ${transpile(value)}`;
