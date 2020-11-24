import {AstNodeParser} from "../../types";
import {FunctionDeclaration} from "../declarations";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#function-expression
export const FunctionExpression: AstNodeParser = (node, options) =>
  FunctionDeclaration(
    {
      ...node,
      id: null
    },
    options
  );

FunctionExpression.scopeBoundary = true;
