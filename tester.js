import jspicl from "./src";

const code = `
// Add your code here to test jspicl
`;
const result = jspicl(code);
console.log("\n--------POLYFILLS--------\n", Object.values(result.polyfills).join("\n"));
console.log("\n-----TRANSPILED CODE-----\n", result.output);
