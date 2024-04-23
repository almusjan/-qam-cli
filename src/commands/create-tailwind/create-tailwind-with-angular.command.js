import {cloner} from "../../git-cloner.js";
export const createTailwindWithAngularCommand = (name, template) => {
    const url = 'https://github.com/almusjan/angular-tailwind-starter-template';
    const message = `\nTemplate created! To get started run: \n  cd ${name}\n  npm install\n  ng serve`;
    cloner(url, name, template, message);
}