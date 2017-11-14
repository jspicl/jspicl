export const _filter = `
function _filter(collection, predicate)
  local result = {}
  for value in all(collection) do
    if predicate(value) then
      add(result, value)
    end
  end

  return result
end
`;
