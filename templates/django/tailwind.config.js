import {addDynamicIconSelectors} from "@iconify/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./templates/**/*.html", "./**/templates/**/*.html",
      './node_modules/flyonui/dist/js/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [
      require('flyonui'),
    require('flyonui/plugin'),
      addDynamicIconSelectors(),
  ],
  flyonui: {
    themes: ['corporate', 'dark']
  }

}

