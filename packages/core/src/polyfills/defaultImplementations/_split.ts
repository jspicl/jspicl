export const _split = `
function _split(str, separator)
  local indices = {}
  local i = 1
  while i <= #str do
    if sub(str, i, i + #separator - 1) == separator then
      add(indices, i)
    end
    i+=1
  end

  local result = {}
  local lastoffset = 1
  foreach(indices, function (offset)
    add(result, sub(str, lastoffset, offset - 1))
    lastoffset = offset + #separator
  end)

  add(result, sub(str, lastoffset))

  if separator == "" then
    del(result, "")
  end

  return result
end`;
