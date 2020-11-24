import {AstNodeParser} from "../../types";

const specialCases: Record<string, string> = {
  null: "nil"
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#literal
export const Literal: AstNodeParser = ({raw}) => specialCases[raw] || raw;
