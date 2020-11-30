export function wrapWithParantheses(condition: boolean, expression: string) {
  return condition ? `(${expression})` : expression;
}
