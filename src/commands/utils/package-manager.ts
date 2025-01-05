import { execSync } from "child_process";

let detectedPackageManager: string | undefined;

export function getPackageManager() {
  // check if package manager is installed globally
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

export function getInstallCommand() {
  const packageManager = getPackageManager();

  return `${packageManager} install`;
}

export function getStartCommand() {
  const packageManager = getPackageManager();
  if (packageManager === "npm") return "npm run start";

  return `${getPackageManager()} start`;
}
