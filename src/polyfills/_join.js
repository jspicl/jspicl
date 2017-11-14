export const _join = `
function _join(collection, separator)
  local result = ""
  for value in all(collection) do
    result = result..separator..tostr(value)
  end

  if separator != "" then
    result = sub(result, 2)
  end

  return result
end
`;
