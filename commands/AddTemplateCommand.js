import ora from "ora";
import chalk from "chalk";
import {exec} from "child_process"
import path from "path"

export const AddTemplateCommand = (name, template, message) => {
    const spinner = ora({color: "magenta"}).start(`Adding tailwind config to ${template}...`);
    const source = path.join(global.__dirname,"..", "templates", template);
    const destination = path.join(process.cwd(), name);
    const cmd = `xcopy ${source} ${destination} /E /I /Y`

    exec(cmd, (error, stdout, stderr) => {
        if(error) {
            spinner.fail(chalk.redBright(error));
            return;
        }
        spinner.succeed(chalk.greenBright("Project has been created successfully!"));
        console.log(chalk.whiteBright(message));
        const readMe_File = path.join(destination, "ReadMe.txt")
        if(readMe_File) exec(`notepad ${readMe_File}`);
    });
}