import type {AstNodeVisitor} from "../../types.js";

export const NewExpression: AstNodeVisitor<NewExpression> = (
  {arguments: args, callee},
  {transpile}
) => {
  const className = `class_${transpile(callee)}`;
  const classArguments = transpile(args, {arraySeparator: ","});

  return `${className}(${classArguments})`;
};
