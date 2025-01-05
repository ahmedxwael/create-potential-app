import inquirer from "inquirer";
import { createNextApp } from "./commands/create-next-app";
import { addAuthJs } from "./commands/utils/authjs/add-authjs";
import { addDrizzleOrm } from "./commands/utils/drizzle/add-drizzle-orm";
import { getAppPath } from "./commands/utils/get-app-path";
import { selectAppType } from "./commands/utils/get-app-type";
import { initializeGitRepo } from "./commands/utils/git/initialize-git-repo";
import { installDependencies } from "./commands/utils/packages/install-dependencies";
import { AppInfo, AppType } from "./types";

// Initialize the appInfo object with default values
const appInfo: AppInfo = {
  name: "my-app",
  path: "",
  type: "next",
};

// Define a record of application types and their corresponding creation functions
const apps: Record<AppType, (appInfo: AppInfo) => Promise<void>> = {
  next: createNextApp,
  remix: () => Promise.resolve(), // Placeholder for remix app creation
};

export async function createApp() {
  try {
    // Prompt the user for the project name
    const { projectName } = await inquirer.prompt([
      {
        type: "input",
        name: "projectName",
        message: "What is your project name?",
        default: "my-app",
      },
    ]);

    // Set the project name in appInfo
    appInfo.name = projectName;

    // Get the application path based on the project name
    appInfo.path = await getAppPath(projectName);

    // If the path is not valid, exit the function
    if (!appInfo.path) return;

    // Prompt the user to select the type of application
    appInfo.type = await selectAppType();

    // Create the application based on the selected type
    await apps[appInfo.type](appInfo);

    // Add Drizzle ORM to the project
    await addDrizzleOrm();

    // Add authentication to the project
    await addAuthJs();

    // Initialize a Git repository in the project directory
    await initializeGitRepo(projectName);

    // Install project dependencies
    await installDependencies();

    // Log a message indicating that the setup is complete
    console.log(
      `Setup complete! Navigate to your project folder: cd ${projectName}`
    );
  } catch (error) {
    // Catch and log any errors that occur during the setup process
    console.error("Error:", error);
  }
}
