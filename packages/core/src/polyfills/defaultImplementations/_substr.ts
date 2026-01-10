export const _substr = `
function _substr(str, indexStart, length)
  return sub(str, indexStart + 1, indexStart + (length or #str))
end`;
