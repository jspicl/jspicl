import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

export default {
  input: "src/index.js",
  output: {
    file: "build/jspicl.js",
    format: "cjs"
  },
  external: ["esprima", "deepMerge"],
  plugins: [
    nodeResolve({
      main: true
    }),
    commonjs()
  ]
};
