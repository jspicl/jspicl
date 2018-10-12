// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#switch-statement
export const SwitchCase = ({ test, consequent }, { transpile }) => {
  if (consequent.length === 0) {
    throw new Error("Switch case fallthroughs are not supported.");
  }

  const statements = transpile(consequent, { arraySeparator: "\n" });
  if (!test) {
    return `\n${statements}`; // Default case
  }

  const testValue = transpile(test);
  return `if ${testValue} == switchCase then
    ${statements}
  `;
};
