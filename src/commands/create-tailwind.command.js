import {cloner} from "../git-cloner.js";
export const createTailwindCommand = (name) => {
    const url = 'https://github.com/almusjan/tailwind-starter-template';
    cloner(url, name, 'tailwind');
}