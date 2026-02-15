export const _findindex = `
function _findindex(collection, value)
  for i=1,#collection do
    if (collection[i] == value) then return i end
  end
end
`;
