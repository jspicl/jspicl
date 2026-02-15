import {normalizeName} from "../../utils/normalizeName.js";
import type {ASTNode, AstNodeVisitor} from "../../types.js";

export const isIdentifier = (node?: ASTNode | null): node is Identifier =>
  node?.type === "Identifier";

const specialCases: Record<string, string> = {
  undefined: "nil"
};

export const Identifier: AstNodeVisitor<Identifier> = ({name}) => {
  const identifier = normalizeName(name);

  return (
    (specialCases.hasOwnProperty(identifier) && specialCases[identifier]) ||
    identifier
  );
};
