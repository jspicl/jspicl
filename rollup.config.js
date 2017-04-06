import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

export default {
  entry: "src/index.js",
  targets: [
    {
      dest: "build/jspicl.es.js",
      format: "es"
    },
    {
      dest: "build/jspicl.js",
      format: "cjs"
    }
  ],
  external: ["esprima"],
  plugins: [
    nodeResolve({
      main: true
    }),
    commonjs()
  ]
};