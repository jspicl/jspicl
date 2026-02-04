import {createTranspiler, type Handlers} from "trastpiler";
import * as defaultMappers from "./ast/index.js";

export function createJspiclTranspiler(
  customMappers?: Handlers,
  initialScopeData?: Record<string, any>
) {
  return createTranspiler({
    initialScopeData,
    handlers: {
      ...(defaultMappers as unknown as Handlers),
      ...customMappers
    }
  });
}
