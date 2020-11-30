import {AstNodeParser} from "../../types";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#this-expression
export const ThisExpression: AstNodeParser = () => "this";
