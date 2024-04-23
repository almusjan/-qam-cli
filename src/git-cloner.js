import chalk from "chalk";
import ora from "ora";
import {exec} from "child_process";
export const cloner = (url, name, template, message) => {
    const spinner = ora({color: 'magenta'}).start(`Creating ${template} project...`);
    const cmd = `git clone ${url} ${name}`;
    const buildCmd = `cd ${name} && npm install && npm run build && mkdir src\\images`;
    exec(cmd, (error, stdout, stderr) => {
        if(error) {
            spinner.fail(chalk.redBright(error));
            return;
        }
        spinner.succeed(chalk.green(" Project created successfully"));
        console.log(chalk.whiteBright(message));
    });
}