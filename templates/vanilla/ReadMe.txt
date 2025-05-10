1- add the following code in package.json(scripts section):
    "build": "npx tailwindcss -o ./public/css/ts-build.css --minify",
    "dev": "npx tailwindcss -i ./public/css/tailwind.css -o ./public/css/main.css --watch"