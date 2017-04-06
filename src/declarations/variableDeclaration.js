import traverser from "../traverser";

export const VariableDeclaration = ({ declarations }) => {
  return traverser(declarations);
};