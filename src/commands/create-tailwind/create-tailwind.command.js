import {cloner} from "../../git-cloner.js";
export const createTailwindCommand = (name, template) => {
    const url = 'https://github.com/almusjan/tailwind-starter-template';
    const message = `\nTemplate created! To get started run: \n  cd ${name}\n  npm install\n  npm run build`;
    cloner(url, name, template, message);
}