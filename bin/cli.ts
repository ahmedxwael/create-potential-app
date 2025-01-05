#!/usr/bin/env node

import { AppInfo, AppType } from "@/types";
import inquirer from "inquirer";
import { createNextApp } from "../src/commands/create-next-app";
import { getAppPath } from "../src/commands/utils/get-app-path";
import { selectAppType } from "../src/commands/utils/get-app-type";
import { initializeGitRepo } from "../src/commands/utils/initialize-git-repo";
import { installDependencies } from "../src/commands/utils/install-dependencies";

const appInfo: AppInfo = {
  name: "my-app",
  path: "",
  type: "next",
};

const apps: Record<AppType, (appInfo: AppInfo) => Promise<void>> = {
  next: createNextApp,
  remix: () => Promise.resolve(),
};

export async function createApp() {
  try {
    const { projectName } = await inquirer.prompt([
      {
        type: "input",
        name: "projectName",
        message: "What is your project name?",
        default: "my-app",
      },
    ]);

    appInfo.name = projectName;
    appInfo.path = await getAppPath(projectName);

    if (!appInfo.path) return;

    appInfo.type = await selectAppType();

    await apps[appInfo.type](appInfo);

    await initializeGitRepo(projectName);

    await installDependencies();

    console.log(
      `Setup complete! Navigate to your project folder: cd ${projectName}`
    );
  } catch (error) {
    console.error("Error:", error);
  }
}

createApp();
