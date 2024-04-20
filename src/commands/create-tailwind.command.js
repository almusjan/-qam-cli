import chalk from "chalk";
import ora from "ora";
import {exec} from "child_process";
export const createTailwindCommand = (name) => {
    const spinner = ora("Creating project...").start();
    const cmd = `git clone https://github.com/almusjan/tailwind-starter-template ${name}`;
    const buildCmd = `cd ${name} && npm install && npm run build`;
    exec(cmd, (error, stdout, stderr) => {
        if(error) {
            console.log(
                chalk.redBright(error)
            );
            return;
        }
        exec(buildCmd, (error, stdout, stderr) => {
            if(error) {
                console.log(
                    chalk.redBright(error)
                );
                return;
            }

            spinner.succeed(chalk.green(" Project created successfully"));
        });
    });
}