import jspicl from "./src";

const code = `
// Add your code here to test jspicl
var foo = "Hello,Agron!";
var bar = foo.split(",");
console.log(bar);
`;
console.log(jspicl(code));
