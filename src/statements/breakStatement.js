// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#break-statement
export const BreakStatement = (NA, { isInsideSwitch }) =>
  isInsideSwitch ? "" : "break";
