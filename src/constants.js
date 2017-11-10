import * as declarationMapper from "./declarations";
import * as expressionMapper from "./expressions";
import * as statementMapper from "./statements";

export const mappers = Object.assign({},
  declarationMapper,
  expressionMapper,
  statementMapper
);

export const generalPolyfills = {
  "Math.max": values => `max(${values})`,
  "Math.floor": value => `flr(${value})`,
  "Object.assign": values => `merge({${values}})`,
  "Object.keys": values => `objectKeys(${values})`,
  "Object.values": values => `objectValues(${values})`,
  "Math.random": () => "rnd(1)",
  "console.log": ([argument]) => `print(${argument})`
};

export const arrayPolyfills = {
  forEach: (context, args) => `foreach(${context}, ${args})`,
  push: (context, args) => `add(${context}, ${args})`,
  join: (context, args) => `join(${context}, ${args})`
};

export const polyfills = `
function objectKeys(source)
  local keys = {}
  local i = 1
  for key, value in pairs(source) do
    keys[i] = key
    i = 1+i
  end

  return keys
end
function objectValues(source)
  local values = {}
  local i = 1
  for key, value in pairs(source) do
    values[i] = value
    i = 1+i
  end

  return values
end
function merge(sources)
  local target = sources[1]
  del(sources, target)
  for source in all(sources) do
    for key, value in pairs(source) do
      target[key] = value
    end
  end

  return target
end
function join(table, separator)
  local result = ""
  for value in all(table) do
    result = result..separator..value
  end

  if (separator != "") then
    result = sub(result, 2)
  end

  return result
end
`;
