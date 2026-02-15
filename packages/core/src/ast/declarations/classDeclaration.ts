import type {ASTNode, AstNodeVisitor} from "../../types.js";

export const isClassDeclaration = (
  node?: ASTNode | null
): node is ClassDeclaration => node?.type === "ClassDeclaration";

export const ClassDeclaration: AstNodeVisitor<ClassDeclaration> = (
  {id, body},
  {transpile}
) =>
  `local class_${transpile(id)} = function (...)
    local this = {}
    local classinstance = ${transpile(body)}
    if (classinstance.constructor) classinstance.constructor(...)
    return classinstance
  end`;
