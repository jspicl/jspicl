import {jspicl} from "./dist/jspicl.esm.js";

const code = `
// Add your code here to test jspicl
`;
const result = jspicl(code, {prettify: true});
console.log(
  "\n--------POLYFILLS--------\n",
  Object.values(result.polyfills).join("\n")
);
console.log("\n-----TRANSPILED CODE-----\n", result.code);
