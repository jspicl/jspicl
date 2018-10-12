import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import {
  main as output,
  module as input,
  dependencies
} from "./package.json";

export default {
  input,
  output: {
    file: output,
    format: "cjs"
  },
  external: Object.keys(dependencies),
  plugins: [
    nodeResolve({
      main: true
    }),
    commonjs()
  ]
};
