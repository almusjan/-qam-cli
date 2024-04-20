import ora from "ora";
import {exec} from "child_process";
import chalk from "chalk";
export const createTailwindWithWebpackCommand = (name) => {
    const spinner = ora("Creating project...").start();
    const cmd = `git clone https://github.com/almusjan/webpack-tailwind-starter ${name}`;
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