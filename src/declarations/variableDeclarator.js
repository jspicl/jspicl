import traverser from "../traverser";

export const VariableDeclarator = ({ id, init }) => {
  const { name } = id;
  const value = traverser(init) || "nil";
  return `local ${name} = ${value}`;
};