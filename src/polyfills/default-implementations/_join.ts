export const _join = `
function _join(collection, separator)
  separator = separator or ","
  local result = ""
  for value in all(collection) do
    result = result..separator..tostr(value)
  end

  if separator != "" then
    result = sub(result, #separator + 1)
  end

  return result
end
`;
