export const _objmap = `
function _objmap(source, mapper)
  local result = {}
  for key, value in pairs(source) do
    add(result, mapper(key, value))
  end

  return result
end
`;
