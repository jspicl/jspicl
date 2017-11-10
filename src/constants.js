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
  "console.log": (argument) => `print(${argument})`,
  "Math.random": () => "rnd(1)"
};

export const arrayPolyfills = {
  forEach: (context, args) => `foreach(${context}, ${args})`,
  push: (context, args) => `add(${context}, ${args})`,
  join: (context, args) => `join(${context}, ${args})`,
  split: (context, separator) => `splitString(${context}, ${separator})`
};

export const polyfills = `
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
function splitString(inputstr, separator)
  if separator == nil then
          print("Invalid separator, you need to supply a proper argument.")
          return
  end

  indexes = {}
  currentindex = 1
  for i = 1, #inputstr do
      local c = sub(inputstr, i,i)
      if c == separator then
        indexes[currentindex] = i
        currentindex = currentindex + 1
      end
  end
  splitvalues = {}

  if #indexes > 0 then
      splitvalues[1] = sub(inputstr, 1, indexes[1] - 1)
      for i = 1, #indexes do 
          if i == #indexes then
            splitvalues[i + 1] =  sub(inputstr, indexes[i] + 1, #inputstr)
          else 
            splitvalues[i + 1] =  sub(inputstr, indexes[i] + 1, indexes[i + 1] - 1)
          end
      end
  end

  return splitvalues
end
`;
