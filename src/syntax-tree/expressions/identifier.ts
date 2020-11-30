import {normalizeName} from "../../helpers";
import {AstNodeParser} from "../../types";

const specialCases: Record<string, string> = {
  undefined: "nil"
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#identifier
export const Identifier: AstNodeParser = ({name, value}) => {
  const identifier = normalizeName(value || name);

  return (
    (specialCases.hasOwnProperty(identifier) && specialCases[identifier]) ||
    identifier
  );
};
