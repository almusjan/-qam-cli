#!/usr/bin/env node

import {program} from "commander";
import chalk from "chalk";
import inquirer from "inquirer";
import figlet from "figlet";
import {createTailwindCommand} from "../src/commands/create-tailwind.command.js";
import {createTailwindWithWebpackCommand} from "../src/commands/create-tailwind-with-webpack.command.js";

const commands = {
    "create tailwind project": createTailwindCommand,
    "create tailwind project with webpack": createTailwindWithWebpackCommand
}

program.version("1.0.0").description("My personal cli");

console.log(chalk.yellowBright(figlet.textSync('QAM CLI', {horizontalLayout: 'full'})))

program.command("create <name>").description("create new project.").action((name) => {
    inquirer.prompt(
        [
            {
                type: 'list',
                name: 'selectedCmd',
                message: 'Choose creation type: ',
                choices: Object.keys(commands)
            }
        ]
    ).then((res) => {
        const command = commands[res.selectedCmd];
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