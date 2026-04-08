# ast-viewer

View the AST of a Typescript file. [See it in action](https://tolokoban.github.io/ast-viewer).

## Description

This project compiles with "rspack" and uses React with CSS modules.

The screen is split in two columns of same size.

- On the left, there is a header with the title of the application and a button to upload a file with extension ".ts" or ".tsx". Just below this header, there is a syntax highlighted area with the content of the file uploaded. The user can also edit manually this content. The code highlighting is made with the "Shiki" library.
- On the right, we see the AST of the content file from the left. This AST is computed by the library "oxc-parser". To compute this AST, we use a debouncer of 1 second on the change event of the file content.

Here is the list of available npm commands:

- `npm start`: use rspack to start the project in development mode (no minifications, source maps). The initial page is open in a browser with the port defined in "package.json".
- `npm run build`: build the project using rspack in production mode (minifications, no source map).
- `npm run deploy`: build the project and uses "gh-pages" to send the result to Github pages.
