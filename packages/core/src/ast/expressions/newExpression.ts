import type {ASTNode, AstNodeVisitor} from "../../types.js";

export const isNewExpression = (node?: ASTNode | null): node is NewExpression =>
  node?.type === "NewExpression";

export const NewExpression: AstNodeVisitor<NewExpression> = (
  {arguments: args, callee},
  {transpile}
) => {
  const className = `class_${transpile(callee)}`;
  const classArguments = transpile(args, {arraySeparator: ","});

  return `${className}(${classArguments})`;
};
