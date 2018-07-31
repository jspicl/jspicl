import { transpile } from "../transpile";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#conditional-expression
export const ConditionalExpression = ({ test, consequent, alternate }) => {
  const testExpression = transpile(test);
  const consequentPath = transpile(consequent);
  const alternatePath = transpile(alternate);

  return `(function () if ${testExpression} then return ${consequentPath} else return ${alternatePath} end end)()`;
};
