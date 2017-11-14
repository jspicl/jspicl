import jspicl from "./src";

const code = `
// Add your code here to test jspicl
`;
const result = jspicl(code);
console.log("\n--------POLYFILLS--------\n", result.polyfills);
console.log("\n-----TRANSPILED CODE-----\n", result.output);
