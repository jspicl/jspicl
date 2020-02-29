export const _sort = `
function _sort(collection, comparison)
  local clone = {}
  for key, value in pairs(collection) do
    clone[key] = value
  end

  for i=1, #clone do
    local j = i
    while j > 1 and _defaultcompare(clone[j], clone[j-1]) do
    clone[j],clone[j-1] = clone[j-1],clone[j]
      j = j - 1
    end
  end

  return clone
end

function _defaultcompare(a, b)
  return a < b
end
`;
