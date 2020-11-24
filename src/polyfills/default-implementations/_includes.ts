export const _includes = `
function _includes(collection, searchelement)
  for value in all(collection) do
    if value == searchelement then
      return true
    end
  end

  return false
end
`;
