import { exec } from "child_process";
import { confirmAction } from "./confirm-action";
import { getInstallCommand } from "./package-manager";
export async function installDependencies() {
  const confirmed = await confirmAction("Do you want to install dependencies?");
  if (!confirmed) return;
  console.log("Installing dependencies...");
  const installCommand = getInstallCommand();
  exec(installCommand, (error, stdout) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(stdout);
  });
  console.log("Dependencies installed successfully!");
}
