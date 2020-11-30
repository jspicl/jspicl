import {AstNodeParser} from "../../types";

type SwitchCase = {
  test: any | null;
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#switch-statement
export const SwitchStatement: AstNodeParser = (
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
