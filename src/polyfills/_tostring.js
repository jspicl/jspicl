export const _tostring = `
function _tostring(input, level)
  level = max(level, 1)
  local output = ""

  if type(input) != "table" then
    return tostr(input)
  end

  local indentation = ""
  for i=2, level do
    indentation = indentation.."  "
  end

  for key, value in pairs(input) do
    if type(value) == "table" then
      output = output..indentation.."  "..key..": ".._tostring(value, level + 1).."\\n"
    elseif type(key) != "number" then
      output = output..indentation.."  "..key..": ".._tostring(value, level + 1).."\\n"
    else
      output = output..value..", "
    end
  end

  if sub(output, -2) == ", " then
    output = indentation.."  "..sub(output, 1, -3).."\\n" -- remove last comma
  end

  return "{\\n"..output..indentation.."}"
end
`;
