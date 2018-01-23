import deepmerge from "deepmerge";

const scopeStack = [{
  variables: {}
}];

export const getCurrentScope = () => scopeStack[scopeStack.length - 1];

export const pushScopeLayer = (scope = {}) => {
  scopeStack.push(deepmerge(getCurrentScope(), scope));

  return getCurrentScope();
};

export const popScopeLayer = () => {
  scopeStack.pop();
};

