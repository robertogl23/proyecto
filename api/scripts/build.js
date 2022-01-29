const ENTRY_PATH = `${__dirname}/../index.ts`;
const OUT_PATH = `${__dirname}/../../build/index.js`;

require("esbuild")
  .build({
    entryPoints: [ENTRY_PATH],
    bundle: true,
    outfile: OUT_PATH,
    platform: "node",
    minify: true,
    watch: {
      onRebuild(error, result) {
        if (error) console.error("watch build failed:", error);
        else console.log("watch build succeeded:", result);
      },
    },
  })
  .catch(() => process.exit(1));
