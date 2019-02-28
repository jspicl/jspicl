export const normalizeName = name => name.toLowerCase().replace(/\$/g, "_");

export const wrapWithParantheses = (condition, expression) =>
  condition ? `(${expression})` : expression;
