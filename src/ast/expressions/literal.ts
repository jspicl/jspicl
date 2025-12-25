import type {AstNodeVisitor} from "../../types.js";

const specialCases: Record<string, string> = {
  null: "nil"
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#literal
export const Literal: AstNodeVisitor = ({raw}) => specialCases[raw] || raw;
