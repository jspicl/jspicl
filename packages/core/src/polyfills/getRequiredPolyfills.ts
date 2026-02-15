import * as defaultPolyfillImplementations from "./defaultImplementations/index.js";
const polyfillMatcher = /(?<!\.)\b_\w+\(/g;

export function getRequiredPolyfills(luaCode: string) {
  // Scan through the code to find polyfilled methods that are prefixed
  // in a particular way(e.g._filter())
  const detectedPolyfills = new Set(luaCode.match(polyfillMatcher));
  const implementations = defaultPolyfillImplementations as Record<
    string,
    string
  >;

  return Array.from(detectedPolyfills).reduce(
    (result, match) => {
      // Remove the '(' character from the match
      const polyfillId = match.substr(0, match.length - 1);
      result[polyfillId] = implementations[polyfillId];
      return result;
    },
    {} as Record<string, string>
  );
}
