import {AddTemplateCommand} from "../AddTemplateCommand.js";
import {exec} from "child_process";
import ora from "ora";
import chalk from "chalk";
import path from "path";
import fs from "fs";

export const createDjangoTemplate = (name, template) => {
    // start first spinner
    const spinner = ora({color: "magenta"}).start(`Creating ${template} project...`)

    // check for dirname
    const dirPath = path.join(process.cwd(), name);
    if (fs.existsSync(dirPath)) {
        spinner.fail(chalk.redBright(`Can not process because "${name}" already exists.`))
        return;
    }

    const isWindows = process.platform === "win32";
    const activateCMD = isWindows ? ".venv\\Scripts\\activate" : "source .venv/bin/activate";
    // end of check

    // command to create full django project with virtualenv
    const initCMD = `mkdir ${name} && cd ${name} && pip install virtualenv && py -m virtualenv .venv && ${activateCMD} && pip install django && django-admin startproject ${name} .`
    // execute the first command
    exec(initCMD, (error, stdout, stderr) => {
        if(error) {
            spinner.fail(chalk.redBright(error));
            return;
        }
        // stop the first spinner
        spinner.succeed(chalk.greenBright("Django is setup to work!"));
        // start the second spinner
        const spinner2 = ora({color: "magenta"}).start(`Installing tailwind dependencies...`);
        // command to install tailwind dependencies
        const installCMD = `cd ${name} && npm init -y && npm pkg set type="module" && npm i --save-dev tailwindcss@3 flyonui@1 @iconify/json @iconify/tailwind`
        // execute the second command
        exec(installCMD, (error, stdout, stderr) => {
            if(error) {
                spinner2.fail(chalk.redBright(error));
                return;
            }
            // stop the second spinner
            spinner2.succeed(chalk.greenBright("tailwind is setup to work!"));
            const message = `\nTemplate has been created created! To get started run: \n  cd ${name}\n  .venv\\scripts\\activate \n  py manage.py runserver`;
            // pass the args to command
            AddTemplateCommand(name, template, message);
        })
    });
}