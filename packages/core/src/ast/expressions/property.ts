import {normalizeName} from "../../helpers/normalizeName.js";
import type {AstNodeVisitor} from "../../types.js";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#object-expression
export const Property: AstNodeVisitor = ({key, value}, {transpile}) => {
  const {name, value: alternativeName = ""} = key; // The key could be a Literal or an Identifier

  return `${normalizeName(name || alternativeName)} = ${transpile(value)}`;
};
