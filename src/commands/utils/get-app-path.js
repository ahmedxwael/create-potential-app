import fs from "fs";
import path from "path";
export async function getAppPath(projectName) {
  const appPath = path.join(process.cwd(), projectName);
  const isDirectory = await new Promise((resolve) => {
    fs.stat(appPath, (_, stats) => {
      resolve(stats.isDirectory());
    });
  });
  if (isDirectory) {
    console.log(
      `${appPath} already exists. please choose another app name or another directory to run the command from.`
    );
    return "";
  }
  return appPath;
}
