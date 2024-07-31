const fs = require("fs");
const path = require("path");
const typescript = require("@rollup/plugin-typescript");

const packagesDir = path.resolve(__dirname, "packages");
const packageFiles = fs.readdirSync(packagesDir);

function output(path) {
  return [
    {
      input: [`./packages/${path}/src/index.ts`],
      output: [
        {
          dir: `./packages/${path}/dist`,
          format: "es",
          sourcemap: false,
        },
      ],
      plugins: [
        typescript({
          include: [`./packages/${path}/src/*`],
          compilerOptions: {
            declarationDir: `./packages/${path}/dist`,
          },
        }),
      ],
    },
  ];
}

module.exports = [...packageFiles.map((path) => output(path)).flat()];
