import mappers from "./constants";

export default (item, { arraySeparator = "\n" } = {}) => {
  return Array.isArray(item) ? item.map(executor).join(arraySeparator) : executor(item);
};

function executor (item) {
  if (!item) {
    return;
  }

  const mapper = mappers[item.type];

  const result = mapper && mapper(item);
  return result !== undefined ? result : console.log(`Traverser: There is no handler for ${item.type}, skipping.`); // eslint-disable-line no-console
}