import type {ASTNode, AstNodeVisitor} from "../../types.js";

export const isSwitchStatement = (
  node?: ASTNode | null
): node is SwitchStatement => node?.type === "SwitchStatement";

export const SwitchStatement: AstNodeVisitor<SwitchStatement> = (
  {discriminant, cases},
  {scope, transpile}
) => {
  const condition = `local switchCase = ${transpile(discriminant)}`;

  scope.isInsideSwitch = true;
  // sort the cases so the default case ends up at the end
  const sortedCases = cases.sort((switchCase: SwitchCase) =>
    !switchCase.test ? 1 : 0
  );

  return `
    ${condition}
    ${transpile(sortedCases, {arraySeparator: "else"})}
    end`;
};

SwitchStatement.scopeBoundary = true;
