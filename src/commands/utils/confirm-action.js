import inquirer from "inquirer";
export async function confirmAction(message) {
  const { confirm } = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirm",
      message: message,
    },
  ]);
  return confirm;
}
