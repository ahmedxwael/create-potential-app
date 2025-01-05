import fs from "fs";
import path from "path";
import simpleGit from "simple-git";
export async function initializeGitRepo(projectName) {
  const git = simpleGit();
  await git.clone("https://github.com/vercel/next.js.git", projectName);
  const projectPath = path.join(process.cwd(), projectName);
  fs.writeFileSync(
    path.join(projectPath, ".env"),
    `NEXT_PUBLIC_APP_NAME="${projectName}"\n`
  );
}
