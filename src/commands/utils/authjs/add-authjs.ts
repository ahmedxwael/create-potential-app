import fs from "fs";
import { confirmAction } from "../confirm-action";

import * as path from "path";

export async function addAuthJs() {
  try {
    const confirmed = await confirmAction("Do you want to add Auth.js?");

    if (!confirmed) return;

    console.log("Adding Auth.js...");

    const templateDir = path.resolve(__dirname, "./templates/authjs");
    const projectDir = path.resolve(__dirname, "./");

    const filesToCopy = ["api", "middleware.ts", "authjs.ts"];

    filesToCopy.forEach((file) => {
      const src = path.join(templateDir, file);
      const dest = path.join(projectDir, file === "api" ? "app/api" : file);
      fs.copyFileSync(src, dest);
    });

    console.log("Auth.js files have been added successfully.");
  } catch (error) {
    console.error(error);
  }
}
