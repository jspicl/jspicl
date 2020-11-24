export const _objmap = `
function _byentries(key, value)
  return {key, value}
end

function _byvalues(key, value)
  return value
end

function _bykeys(key)
  return key
end

function _objmap(source, mapper)
  local result = {}
  for key, value in pairs(source) do
    add(result, mapper(key, value))
  end

  return result
end
`;
