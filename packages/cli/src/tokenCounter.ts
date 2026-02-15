// Each token is a word (e.g. variable name) or operator.
// Pairs of brackets, and strings count as 1 token.
// Commas, periods, LOCALs, semi-colons, ENDs, and comments are not counted.
const tokens = [
  /\"[^\"]*\"/, // Strings
  /\d+\.\d+/, // floating numbers
  /\w+/, // words
  /\d+/, // numbers

  /!=/, // inequality
  /==/, // comparison
  /\+=/, // incrementing assignment
  /-=/, // decrementing assignment
  /<=/, // equal or less than
  />=/, // equal or greater than
  /\.\./, // string concatenation

  /</, // less than
  />/, // greater than
  /\+/, // addition
  /-/, // subtraction
  /\//, // division
  /\*/, // multiplication
  /=/, // equals
  /\%/, // percentage
  /\(/, // paranthesis
  /\[/, // left bracket
  /\{/ // left curly brace
]
  .map((r) => r.source)
  .join("|");

/** Calculates the token count for the passed in Lua code*/
export function getTokenCount(luaCode: string) {
  const regex = new RegExp(`(${tokens})`, "gi");

  return (luaCode.match(regex) || []).filter(
    (token) => token !== "local" && token !== "end"
  ).length;
}
