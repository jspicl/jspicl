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

  const result = mapper && mapper(node);
  return result !== undefined ? result : console.error(`Transpile: There is no handler for ${node.type}, skipping.`); // eslint-disable-line no-console
}
