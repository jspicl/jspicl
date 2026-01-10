import {normalizeName} from "../../helpers/normalizeName.js";
import type {AstNodeVisitor} from "../../types.js";

const specialCases: Record<string, string> = {
  undefined: "nil"
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#identifier
export const Identifier: AstNodeVisitor = ({name, value}) => {
  const identifier = normalizeName(value || name);

  return (
    (specialCases.hasOwnProperty(identifier) && specialCases[identifier]) ||
    identifier
  );
};
