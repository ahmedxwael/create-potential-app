import { spawn } from "child_process";
import { promises as fs } from "fs";
import { join } from "path";
import { AppInfo } from "../../types";

/**
 * Creates a new Next.js application using a specified template.
 *
 * @param {AppInfo} appInfo - Information about the application to be created.
 * @throws Will throw an error if the application name is not provided or if the creation process fails.
 */
export async function createNextApp(appInfo: AppInfo): Promise<void> {
  if (!appInfo.name) {
    throw new Error("Application name is required.");
  }

  console.log(`Creating a new Next.js app in ${appInfo.name}...`);

  // Run the create-next-app command with the specified template
  const child = spawn(
    "npx",
    [
      "create-next-app",
      appInfo.name,
      "--example",
      join(__dirname, "templates/next"),
    ],
    { stdio: "inherit" }
  );

  // Handle the close event of the child process
  const exitCode = await new Promise<number>((resolve, reject) => {
    child.on("close", resolve);
    child.on("error", reject);
  });

  if (exitCode !== 0) {
    throw new Error(`create-next-app exited with code ${exitCode}`);
  }

  // Ensure the destination directory exists
  const destDir = join(process.cwd(), appInfo.name, ".github");

  try {
    await fs.mkdir(destDir, { recursive: true });
  } catch (error) {
    throw new Error(`Failed to create directory ${destDir}: ${error}`);
  }

  // Copy the GitHub-related files from the template to the new project
  try {
    await fs.copyFile(
      join(__dirname, "templates/next", "github", ".github"),
      destDir
    );
  } catch (error) {
    throw new Error(`Failed to copy .github files: ${error}`);
  }

  console.log(`Project ${appInfo.name} created successfully.`);
}
