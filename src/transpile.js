import { getMapper } from "./constants";
import { pushScopeLayer, popScopeLayer, getCurrentScope } from "./scope";

export const transpile = (node, { arraySeparator = "\n" } = {}) => {
  const nodes = Array.isArray(node) ? node : [node];
  return nodes.map(executor).join(arraySeparator); // eslint-disable-line no-use-before-define
};

const executor = node => {
  if (!node) {
    return;
  }

  // Attempt to find the specific declaration, expression or statement
  const mapper = getMapper(node.type);
  if (!mapper) {
    const { loc: { start = {} } = {} } = node;
    throw new Error(`\x1b[41m\x1b[37mThere is no handler for ${node.type}, line ${start.line} column ${start.column}\x1b[0m`);
  }

  const scope = mapper.scopeBoundary && pushScopeLayer() || getCurrentScope();
  const result = mapper(node, scope) || "";
  mapper.scopeBoundary && popScopeLayer();

  return result;
};
