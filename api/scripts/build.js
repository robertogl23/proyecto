const ENTRY_PATH = `${__dirname}/../index.ts`;
const OUT_PATH = `${__dirname}/../../build/index.js`;

const isProduction = process.env.NODE_ENV === "production";

console.log("Build:", isProduction ? "Production" : "Development");

require("esbuild")
  .build({
    entryPoints: [ENTRY_PATH],
    bundle: true,
    outfile: OUT_PATH,
    platform: "node",
    minify: true,
    watch: !isProduction ? {
      onRebuild(error, result) {
        if (error) console.error("watch build failed:", error);
        else console.log("watch build succeeded:", result);
      },
    } : false,
  })
  .catch(() => process.exit(1));
