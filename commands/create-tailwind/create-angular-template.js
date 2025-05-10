import {AddTemplateCommand} from "../AddTemplateCommand.js";
import {exec} from "child_process";
import ora from "ora";
import chalk from "chalk";
import fs from "fs";
import path from "path";

export const createAngularTemplate = (name, template) => {
    // start first spinner
    const spinner = ora({color: "magenta"}).start(`Creating ${template} project...`)

    // check for dirname
    const dirPath = path.join(process.cwd(), name);
    if (fs.existsSync(dirPath)) {
        spinner.fail(chalk.redBright(`Can not process because "${name}" already exists.`))
        return;
    }
    // end of check

    // command to create angular app with no standalone
    const initCMD = `ng new ${name} --style=scss --no-standalone --ssr --no-server-routing`
    // execute the first command
    exec(initCMD, (error, stdout, stderr) => {
        if(error) {
            spinner.fail(chalk.redBright(error));
            return;
        }
        // stop the first spinner
        spinner.succeed(chalk.greenBright("Angular is setup to work!"));
        // start the second spinner
        const spinner2 = ora({color: "magenta"}).start(`Installing tailwind dependencies...`);
        // command to install tailwind dependencies
        const installCMD = `cd ${name} && npm i --save-dev tailwindcss@3 postcss autoprefixer flyonui@1 @iconify/json @iconify/tailwind`
        // execute the second command
        exec(installCMD, (error, stdout, stderr) => {
            if(error) {
                spinner2.fail(chalk.redBright(error));
                return;
            }
            // stop the second spinner
            spinner2.succeed(chalk.greenBright("tailwind is setup to work!"));
            const message = `\nTemplate has been created created! To get started run: \n  cd ${name}\n  ng serve`;
            // pass the args to command
            AddTemplateCommand(name, template, message);
        })
    })
}