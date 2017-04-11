import * as declarationMapper from "./declarations";
import * as statementMapper from "./statements";
import * as expressionMapper from "./expressions";

export default Object.assign({},
  declarationMapper,
  statementMapper,
  expressionMapper);

export const polyfills = `
function merge(target, source)
  for key, value in pairs(source) do
    target[key] = value
  end
  return target
end
function join(table, separator)
  local result = ""
  for value in all(table) do
    result = result..separator..value
  end

  if (separator == "") then
    result = sub(result, 2)
  end

  return result
end
`;