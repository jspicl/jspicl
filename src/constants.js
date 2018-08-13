import * as declarationMapper from "./declarations";
import * as expressionMapper from "./expressions";
import * as statementMapper from "./statements";

export const getMapper = type => {
  return declarationMapper[type] || expressionMapper[type] || statementMapper[type];
};

export const generalPolyfillMap = {
  "console.log": argument => `printh(${argument})`,
  "math.abs": value => `abs(${value})`,
  "math.ceil": value => `-flr(-${value})`,
  "math.floor": value => `flr(${value})`,
  "math.max": values => `max(${values})`,
  "math.min": values => `min(${values})`,
  "math.random": () => "rnd()",
  "math.sqrt": value => `sqrt(${value})`,
  "math.sin": value => `-sin(${value})`,
  "object.assign": values => `_assign({${values}})`,
  "object.entries": values => `_objmap(${values}, _byentries)`,
  "object.keys": values => `_objmap(${values}, _bykeys)`,
  "object.values": values => `_objmap(${values}, _byvalues)`
};

export const arrayPolyfillMap = {
  filter: (context, args) => `_filter(${context}, ${args})`,
  foreach: (context, args) => `foreach(${context}, ${args})`,
  includes: (context, arg) => `_includes(${context}, ${arg})`,
  join: (context, args) => `_join(${context}, ${args})`,
  length: context => `#${context}`,
  map: (context, args) => `_map(${context}, ${args})`,
  push: (context, args) => `add(${context}, ${args})`,
  reduce: (context, args) => `_reduce(${context}, ${args})`,
  split: (context, args) => `_split(${context}, ${args})`,
  substr: (context, args) => `_substr(${context}, ${args})`,
  substring: (context, args) => `_substring(${context}, ${args})`,
  tostring: context => `_tostring(${context})`
};
