import type {ASTNode, AstNodeVisitor} from "../../types.js";
import {
  declareLocalVariablesForArrayPattern,
  declareLocalVariablesForObjectPattern,
  declareVariable
} from "../../utils/declareVariable.js";

export const isVariableDeclarator = (
  node?: ASTNode | null
): node is VariableDeclarator => node?.type === "VariableDeclarator";

export const VariableDeclarator: AstNodeVisitor<VariableDeclarator> = (
  {id, init},
  {scope, transpile}
) => {
  const initValue = transpile(init) || "nil";

  if (id.type === "ArrayPattern") {
    return declareLocalVariablesForArrayPattern(
      id,
      initValue,
      scope,
      transpile
    );
  }

  if (id.type === "ObjectPattern") {
    return declareLocalVariablesForObjectPattern(
      id,
      initValue,
      scope,
      transpile
    );
  }

  return declareVariable(id.name, initValue, scope);
};
