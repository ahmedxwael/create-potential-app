import inquirer from "inquirer";
export async function selectAppType() {
  const { appType } = await inquirer.prompt([
    {
      type: "list",
      name: "appType",
      message: "Select the type of your application:",
      choices: ["next"],
    },
  ]);
  return appType;
}
