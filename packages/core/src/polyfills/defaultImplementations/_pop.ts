export const _pop = `
function _pop(collection)
  local v = collection[#collection]
  collection[#collection] = nil
  return v
end`;
