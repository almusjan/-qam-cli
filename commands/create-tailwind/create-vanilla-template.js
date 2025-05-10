import {AddTemplateCommand} from "../AddTemplateCommand.js";
import {exec} from "child_process";
import ora from "ora";
import chalk from "chalk";
import fs from "fs";
import path from "path";

export const createVanillaTemplate = (name, template) => {
    // start first spinner
    const spinner = ora({color: "magenta"}).start(`Creating ${template} project...`)

    // check for dirname
    const dirPath = path.join(process.cwd(), name);
    if (fs.existsSync(dirPath)) {
        spinner.fail(chalk.redBright(`Can not process because "${name}" already exists.`))
        return;
    }
    // end of check

    // command to make directory and initial npm package
    const initCMD = `mkdir ${name} && cd ${name} && npm init -y`;
    // execute the first command
    exec(initCMD, (error, stdout, stderr) => {
        if(error) {
            spinner.fail(chalk.redBright(error));
            return;
        }
        // stop the first spinner
        spinner.succeed(chalk.greenBright("Vanilla Html is setup to work!"));
        // start the second spinner
        const spinner2 = ora({color: "magenta"}).start(`installing tailwind dependencies...`);
        // command to install tailwind dependencies
        const installCMD = `cd ${name} && npm pkg set type="module" && npm i --save-dev tailwindcss@3 flyonui@1 @iconify/json @iconify/tailwind`;
        // execute the second command
        exec(installCMD, (error, stdout, stderr) => {
            if(error) {
                spinner2.fail(chalk.redBright(error));
                return;
            }
            // stop the second spinner
            spinner2.succeed(chalk.greenBright("tailwind is setup to work!"));
            const message = `\nTemplate has been created created! To get started run: \n  cd ${name}\n  public\\index.html`;
            // pass the args to command
            AddTemplateCommand(name, template, message);
        });
    })
}