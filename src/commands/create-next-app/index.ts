import { AppInfo } from "@/index";
import { spawn } from "child_process";
import { copyFile } from "fs";
import { join } from "path";
import { promisify } from "util";

/**
 * Creates a new Next.js app based on the "next" template.
 *
 * This function asks the user for a project name and then uses the
 * `@vercel/ncc` package to create a new Next.js app based on the
 * template stored in the "templates/next" directory. It also copies
 * the GitHub-related files from the template to the new project.
 */
export async function createNextApp(appInfo: AppInfo) {
  // The `copyFile` function is a callback-based function, but we want to
  // use it with async/await. So we use the `promisify` function from
  // the `util` module to convert it to a promise-returning function.
  const copyAsync = promisify(copyFile);

  if (!appInfo.name) {
    throw new Error("Missing required argument: projectName");
  }

  console.log(`Creating ${appInfo.name} ${appInfo.type} project...`);

  // Create a new Next.js app based on the "next" template
  const child = spawn(
    "npx",
    [
      "next",
      "new",
      appInfo.name,
      "--example",
      join(__dirname, "templates/next"),
    ],
    { stdio: "inherit" }
  );

  child.on("close", (code) => {
    if (code !== 0) {
      throw new Error(`next new exited with code ${code}`);
    }
  });

  // Copy the GitHub-related files from the template to the new project
  await copyAsync(
    join(__dirname, "templates/next", "github", ".github"),
    join(process.cwd(), appInfo.name, ".github")
  );
}
