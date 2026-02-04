import type {AstNodeVisitor} from "../../types.js";

const specialCases: Record<string, string> = {
  null: "nil"
};

export const Literal: AstNodeVisitor<Literal> = ({raw}) =>
  specialCases[raw] || raw;
