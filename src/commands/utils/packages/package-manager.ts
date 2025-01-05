import { execSync } from "child_process";

let detectedPackageManager: string | undefined;

/**
 * Detects the package manager used in the project.
 * It checks for the presence of 'yarn', 'pnpm', and 'npm' by running their version commands.
 *
 * @returns {string} The name of the detected package manager.
 * @throws Will throw an error if no package manager is detected.
 */
export function getPackageManager(): string {
  if (detectedPackageManager) return detectedPackageManager;

  const packageManagers = ["yarn", "pnpm", "npm"];

  for (const packageManager of packageManagers) {
    try {
      execSync(`${packageManager} --version`, { stdio: "ignore" });
      detectedPackageManager = packageManager;
      return packageManager;
    } catch {
      continue;
    }
  }

  throw new Error("No package manager detected");
}

/**
 * Constructs the install command for the detected package manager.
 *
 * @returns {string} The install command for the detected package manager.
 */
export function getInstallCommand(): string {
  const packageManager = getPackageManager();

  return `${packageManager} install`;
}

/**
 * Constructs the start command for the detected package manager.
 * For 'npm', it returns 'npm run start', otherwise it returns '<packageManager> start'.
 *
 * @returns {string} The start command for the detected package manager.
 */
export function getStartCommand(): string {
  const packageManager = getPackageManager();
  if (packageManager === "npm") return "npm run start";

  return `${getPackageManager()} start`;
}

/**
 * Retrieves the latest version of a given package from the npm registry.
 *
 * @param {string} packageName - The name of the package to get the latest version for.
 * @returns {string} The latest version of the package.
 */
export function getLatestVersion(packageName: string): string {
  const packageManager = getPackageManager();

  return execSync(`${packageManager} show ${packageName} version`)
    .toString()
    .trim();
}
