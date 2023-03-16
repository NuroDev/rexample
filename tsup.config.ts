import { defineConfig } from "tsup";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  clean: true,
  dts: false,
  entry: {
    index: "bin/rexample.ts",
  },
  format: ["cjs", "esm"],
  minify: isProduction,
});
