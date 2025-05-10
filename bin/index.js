#!/usr/bin/env node
global.__dirname = import.meta.dirname
import {program} from "commander";
import chalk from "chalk";
import figlet from "figlet"
import {createVanillaTemplate} from "../commands/create-tailwind/create-vanilla-template.js";
import {createDjangoTemplate} from "../commands/create-tailwind/create-django-template.js";
import {createAngularTemplate} from "../commands/create-tailwind/create-angular-template.js";
import {choice_command_handler} from "../commands/handlers/choice_command_handler.js";

program.name('QAM CLI').version("QAM CLI: 1.2.1\nNode: 22.11.0\nNPM: 10.9.1", "-v, --version").description("a simple cli to help me generate projects.");

console.log(chalk.redBright(figlet.textSync("QAM CLI", {horizontalLayout: "full"})));

// tailwind creation command start
const creationCommands = {
    "Vanilla": createVanillaTemplate,
    "Angular": createAngularTemplate,
    "Django": createDjangoTemplate
}
choice_command_handler(program, "create-tailwind <name>", "create new tailwind project.", creationCommands);
// tailwind creation command end

program.parse(program.argv)