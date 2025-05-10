import inquirer from "inquirer";
import chalk from "chalk";

export const choice_command_handler = (program, cmd, description, commandsList) => {
    if(!commandsList) return;

    program.command(cmd).description(description)
        .action(name => {
            inquirer.prompt(
                [
                    {
                        name: "selectedCommand",
                        type: "list",
                        message: "Choose your template:",
                        choices: Object.keys(commandsList)
                    }
                ]
            ).then((res) => {
                const command = commandsList[res.selectedCommand]
                if(command) {
                    command(name, res.selectedCommand)
                } else {
                    console.log(
                        chalk.redBright("Invalid Selection!")
                    );
                }
            })
    });
}