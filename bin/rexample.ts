import fs from "fs";
import prompts from "prompts";
import { exec } from "child_process";
import { join } from "path";
import { promisify } from "util";

import type { Choice } from "prompts";

const execAsync = promisify(exec);

async function main() {
  const cwd = process.cwd();

  // TODO: Check if an examples directory already exists.

  const examplesDirectoryPath = join(cwd, "examples");
  const exampleFiles = fs
    .readdirSync(examplesDirectoryPath)
    .filter((i) => i.endsWith(".ts")) // TODO: Support .js, .mjs, .cjs, etc.
    .map((i) => i.replace(".ts", ""));

  // TODO: If no examples, exit early with a warning.

  const choices: Array<Choice> = await Promise.all(
    exampleFiles.map(async (key) => {
      const exampleFilePath = join(cwd, "examples", key);
      const module = await import(exampleFilePath);

      return {
        description: module.description || key,
        title: module.title || key,
        value: key,
      };
    })
  );

  try {
    const { fn } = await prompts({
      choices,
      message: "Run example",
      name: "fn",
      type: "autocomplete",
    });
    if (!fn) return; // TODO: Better handling of this error.

    // TODO: Investigate if there's a better way to stream the execution output to the console.
    // TODO: Look into calling `tsx` pragmatically instead of using `exec`.
    const { stderr, stdout } = await execAsync(
      `tsx ${join(cwd, "examples", fn)}`
    );
    console.log(stdout || stderr);
  } catch (e) {
    process.exit(1);
  }
}

main();
