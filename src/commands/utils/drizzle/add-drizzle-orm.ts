import { GenericObject } from "@/types";
import fs from "fs";
import path from "path";
import { confirmAction } from "../confirm-action";
import { getLatestVersion } from "../packages/package-manager";

/**
 * Adds Drizzle ORM to the project by installing the necessary packages
 * and copying template files.
 *
 * @throws Will throw an error if the process fails.
 */
export async function addDrizzleOrm() {
  try {
    const confirmed = await confirmAction("Do you want to add Drizzle ORM?");

    if (!confirmed) return;

    console.log("Adding Drizzle ORM...");

    // Read package.json
    const packageJsonPath = path.join(__dirname, "./package.json");
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

    // Add Drizzle ORM packages to dependencies
    // Get the latest versions of the packages
    const drizzleOrmVersion = getLatestVersion("drizzle-orm");
    const dotenvVersion = getLatestVersion("dotenv");

    packageJson.dependencies = {
      ...packageJson.dependencies,
      "drizzle-orm": `^${drizzleOrmVersion}`,
      dotenv: `^${dotenvVersion}`,
    };

    // Write the updated package.json back to the file
    fs.writeFileSync(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2),
      "utf8"
    );

    // Use Drizzle ORM templates from templates folder
    const templatesDir = path.join(__dirname, "./templates/drizzle");
    const rootDir = path.join(__dirname, "./");
    const appDir = path.join(__dirname, "./app");

    fs.readdirSync(templatesDir).forEach((file) => {
      const srcPath = path.join(templatesDir, file);
      const filesMap: GenericObject = {
        "drizzle.config.ts": rootDir,
        db: appDir,
      };

      const destPath = filesMap[file] || rootDir;

      if (fs.lstatSync(srcPath).isDirectory()) {
        const subFiles = fs.readdirSync(srcPath);

        subFiles.forEach((subFile) => {
          const subSrcPath = path.join(srcPath, subFile);
          const subDestPath = path.join(destPath, subFile);
          fs.copyFileSync(subSrcPath, subDestPath);
        });
      } else {
        const destFilePath = path.join(destPath, file);
        fs.copyFileSync(srcPath, destFilePath);
      }
    });

    console.log("Drizzle ORM has been added to your project.");
  } catch (error) {
    console.error(`Failed to add Drizzle ORM: ${error}`);
  }
}
