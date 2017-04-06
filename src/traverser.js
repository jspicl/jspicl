import mapper from "./constants";

export default (item, { arraySeparator = "\n" } = {}) => {
  return Array.isArray(item) ? item.map(executor).join(arraySeparator) : executor(item);
};

function executor (item) {
  if (!item) {
    return;
  }

  const result = mapper[item.type] && mapper[item.type](item);
  return result !== undefined ? result : console.log(`Traverser: There is no handler for ${item.type}, skipping.`); // eslint-disable-line no-console
}