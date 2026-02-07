import type {ASTNode, AstNodeVisitor} from "../../types.js";

export const isLiteral = (node?: ASTNode | null): node is Literal =>
  node?.type === "Literal";

const specialCases: Record<string, string> = {
  null: "nil"
};
export const Literal: AstNodeVisitor<Literal> = ({value, raw}) => {
  if (Number.isInteger(value)) {
    return value!.toString();
  }

  return specialCases[raw] || raw;
};
