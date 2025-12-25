import type {AstNodeVisitor} from "../../types.js";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#class-expression
export const MethodDefinition: AstNodeVisitor = ({key, value}, {transpile}) =>
  `${transpile(key)} = ${transpile(value)}`;
