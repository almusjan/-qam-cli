import {cloner} from "../git-cloner.js";
export const createTailwindWithWebpackCommand = (name) => {
    const url = 'https://github.com/almusjan/webpack-tailwind-starter-template';
    cloner(url, name, 'tailwind/webpack');
}