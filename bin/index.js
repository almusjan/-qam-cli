#!/usr/bin/env node

import {program} from "commander";
import chalk from "chalk";
import inquirer from "inquirer";
import figlet from "figlet";
import {createTailwindCommand} from "../src/commands/create-tailwind.command.js";
import {createTailwindWithWebpackCommand} from "../src/commands/create-tailwind-with-webpack.command.js";

const creationCommands = {
    "create tailwind project": createTailwindCommand,
    "create tailwind project with webpack": createTailwindWithWebpackCommand
}

program.version("QAM CLI: 1.1.2 \nNode: 20.11.1 \nPackage Manager: npm 10.2.4").description("github authentication is required for this version!");

console.log(chalk.redBright(figlet.textSync('QAM CLI', {horizontalLayout: 'full'})))

program.command("create <name>").description("create new project.").action((name) => {
    inquirer.prompt(
        [
            {
                type: 'list',
                name: 'selectedCmd',
                message: 'Choose creation type: ',
                choices: Object.keys(creationCommands)
            }
        ]
    ).then((res) => {
        const command = creationCommands[res.selectedCmd];
        if(command) {
            command(name);
        }else {
            console.log(
              chalk.redBright("Invalid Selection!")
            );
        }
    });
});

program.parse(program.argv);