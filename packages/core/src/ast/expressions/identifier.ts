import {normalizeName} from "../../utils/normalizeName.js";
import type {AstNodeVisitor} from "../../types.js";

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
