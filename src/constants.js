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
  "Object.entries": values => `objectEntries(${values})`,
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
  for key, value in pairs(source) do
    keys[#keys+1] = key
  end

  return keys
end
function objectValues(source)
  local values = {}
  for key, value in pairs(source) do
    values[#values+1] = value
  end

  return values
end
function objectEntries(source)
  local entries = {}
  for key, value in pairs(source) do
    entries[#entries+1] = {key,value}
  end

  return entries
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
