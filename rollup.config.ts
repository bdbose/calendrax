import typescript from "rollup-plugin-typescript2";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import css from "rollup-plugin-import-css";

export default {
  input: "src/index.ts",
  output: [
    { file: "dist/index.cjs.js", format: "cjs" },
    { file: "dist/index.esm.js", format: "esm" },
  ],
  external: ["react", "react-dom"],
  plugins: [nodeResolve(), commonjs(), css(), typescript()],
};
