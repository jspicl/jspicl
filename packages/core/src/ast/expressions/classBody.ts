import type {ASTNode, AstNodeVisitor} from "../../types.js";

export const isClassBody = (node?: ASTNode | null): node is ClassBody =>
  node?.type === "ClassBody";

export const ClassBody: AstNodeVisitor<ClassBody> = ({body}, {transpile}) =>
  `{
    ${transpile(body, {arraySeparator: ",\n"})}
  }`;
