import esbuild from "esbuild";
import prompts from "prompts";
import { capitalize } from "radash";
import { existsSync, readdirSync, readFileSync } from "fs";
import { join, parse as parsePath } from "path";

import type { Choice } from "prompts";
import type { ParsedPath } from "path";

async function main() {
  const cwd = process.cwd();

  if (!existsSync(join(cwd, "examples")))
    throw new Error('No "examples" directory found.');

  const examplesDirectoryPath = join(cwd, "examples");
  const exampleFiles = readdirSync(examplesDirectoryPath)
    .filter((i) => i.endsWith(".ts")) // TODO: Support .js, .mjs, .cjs, etc.
    .map((i) => parsePath(join(examplesDirectoryPath, i)));

  if (exampleFiles.length <= 0)
    throw new Error("No example scripts available to run.");

  const choices = exampleFiles.map(
    (file): Choice => ({
      description: join("examples", file.base),
      title: capitalize(file.name),
      value: file,
    })
  );

  try {
    const { rawPath } = await prompts({
      choices,
      message: "Run example",
      name: "rawPath",
      type: "autocomplete",
    });
    if (!rawPath) throw new Error("No or invalid example file path.");

    const path = rawPath as ParsedPath;
    const absolutePath = join(path.dir, path.base);

    const { code } = await esbuild.transform(
      readFileSync(absolutePath, "utf-8"),
      {
        format: "cjs",
        loader: "jsx",
      }
    );

    const builtModule = await esbuild.build({
      format: "cjs",
      stdin: {
        contents: code,
      },
      write: false,
    });

    const { default: mainFunc } = eval(builtModule.outputFiles![0].text);
    await mainFunc();
  } catch (error) {
    throw error;
  }
}

main();
