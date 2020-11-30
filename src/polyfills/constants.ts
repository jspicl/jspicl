export const genericPolyfillMap: Record<string, (args: string) => string> = {
  "console.log": (args) => `printh(${args})`,
  "math.abs": (args) => `abs(${args})`,
  "math.ceil": (args) => `ceil(${args})`,
  "math.floor": (args) => `flr(${args})`,
  "math.max": (args) => `max(${args})`,
  "math.min": (args) => `min(${args})`,
  "math.random": () => "rnd()",
  "math.sqrt": (args) => `sqrt(${args})`,
  "math.sin": (args) => `-sin(${args})`,
  "object.assign": (args) => `_assign({${args}})`,
  "object.entries": (args) => `_objmap(${args}, _byentries)`,
  "object.keys": (args) => `_objmap(${args}, _bykeys)`,
  "object.values": (args) => `_objmap(${args}, _byvalues)`
};

export const arrayPolyfillMap: Record<
  string,
  (context: string, args: string) => string
> = {
  filter: (context, args) => `_filter(${context}, ${args})`,
  findindex: (context, args) => `_findindex(${context}, ${args})`,
  foreach: (context, args) => `foreach(${context}, ${args})`,
  includes: (context, arg) => `_includes(${context}, ${arg})`,
  join: (context, args) =>
    args ? `_join(${context}, ${args})` : `_join(${context})`,
  length: (context) => `#${context}`,
  map: (context, args) => `_map(${context}, ${args})`,
  pop: (context) => `_pop(${context})`,
  push: (context, args) => `add(${context}, ${args})`,
  reduce: (context, args) => `_reduce(${context}, ${args})`,
  sort: (context, args) =>
    args ? `_sort(${context}, ${args})` : `_sort(${context})`,
  split: (context, args) => `_split(${context}, ${args})`,
  substr: (context, args) => `_substr(${context}, ${args})`,
  substring: (context, args) => `_substring(${context}, ${args})`,
  tostring: (context) => `_tostring(${context})`
};
