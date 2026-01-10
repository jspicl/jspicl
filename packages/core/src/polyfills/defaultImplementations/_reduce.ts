export const _reduce = `
function _reduce(collection, callback, initialvalue)
  local result = collection[1]
  local startindex = 2
  if initialvalue then
    result = initialvalue
    startindex = 1
  end

  for i=startindex, #collection do
    result = callback(result, collection[i])
  end

  return result
end
`;
