import { FunctionExpression } from "expressions";
import { wrapWithParantheses } from "helpers";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#expression-statement
export const ExpressionStatement = ({ expression, directive }, { transpile }) =>
  !directive
  && wrapWithParantheses(
    expression.type === FunctionExpression.name,
    transpile(expression)
  );
