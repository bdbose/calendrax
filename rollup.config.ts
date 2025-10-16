import typescript from "rollup-plugin-typescript2";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import css from "rollup-plugin-import-css";

export default {
  input: "src/index.ts",
  output: [
    { 
      file: "dist/index.cjs.js", 
      format: "cjs",
      sourcemap: true,
      exports: "named"
    },
    { 
      file: "dist/index.esm.js", 
      format: "esm",
      sourcemap: true
    },
  ],
  external: ["react", "react-dom", "react/jsx-runtime"],
  plugins: [
    nodeResolve(), 
    commonjs(), 
    css({ output: "styles.css", minify: true }), 
    typescript({
      tsconfig: "./tsconfig.json",
      useTsconfigDeclarationDir: true,
    })
  ],
};
