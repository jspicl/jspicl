import { mappers } from "./constants";

export default function transpile (node, { arraySeparator = "\n" } = {}) {
  return Array.isArray(node) ? node.map(executor).join(arraySeparator) : executor(node);
}

function executor (node) {
  if (!node) {
    return;
  }

  // Attempt to find the specific declaration, expression or statement
  const mapper = mappers[node.type];
  if (!mapper) {
    const { loc: { start } } = node;
    throw new Error(`\x1b[41m\x1b[37mThere is no handler for ${node.type}, line ${start.line} column ${start.column}\x1b[0m`);
  }

  const result = mapper && mapper(node);
  return result || "";
}
