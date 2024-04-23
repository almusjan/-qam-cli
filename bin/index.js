#!/usr/bin/env node

import {program} from "commander";
import chalk from "chalk";
import inquirer from "inquirer";
import figlet from "figlet";
import {createTailwindCommand} from "../src/commands/create-tailwind/create-tailwind.command.js";
import {createTailwindWithWebpackCommand} from "../src/commands/create-tailwind/create-tailwind-with-webpack.command.js";
import {createTailwindWithAngularCommand} from "../src/commands/create-tailwind/create-tailwind-with-angular.command.js";

const creationCommands = {
    "Vanilla": createTailwindCommand,
    "Webpack": createTailwindWithWebpackCommand,
    "Angular": createTailwindWithAngularCommand
}

program.version("QAM CLI: 1.1.3 \nNode: 20.11.1 \nPackage Manager: npm 10.2.4").description("github authentication is required for this version!");

console.log(chalk.redBright(figlet.textSync('QAM CLI', {horizontalLayout: 'full'})))

/**
 * Create tailwind project command
 */
program.command("create-tailwind <name>").description("create new tailwind project.").action((name) => {
    inquirer.prompt(
        [
            {
                type: 'list',
                name: 'selectedCmd',
                message: 'Choose your UI template: ',
                choices: Object.keys(creationCommands)
            }
        ]
    ).then((res) => {
        const command = creationCommands[res.selectedCmd];
        if(command) {
            command(name, res.selectedCmd);
        }else {
            console.log(
              chalk.redBright("Invalid Selection!")
            );
        }
    });
});

program.parse(program.argv);