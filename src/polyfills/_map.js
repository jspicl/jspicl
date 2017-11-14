export const _map = `
function _map(collection, callback)
  local result = {}
  for value in all(collection) do
    add(result, callback(value))
  end

  return result
end
`;
