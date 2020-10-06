# Pi-kea: Project Piccolo's reproduction of the Ikea product page
![animated screenshot](sofamart.1417ef76.gif)
## Related Projects
  - https://github.com/FEC-HRR41-PICOLLO/darjama-ikea-reviews (this file)
  - https://github.com/FEC-HRR41-PICOLLO/ryuuohlee-ikea-item-description
  - https://github.com/FEC-HRR41-PICOLLO/DavidFuent1-Ikea-PhotoCarousel
  - https://github.com/FEC-HRR41-PICOLLO/djason-ikea-similar-products

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> The client/index.jsx file is the entry point for webpack to bundle the files. Linking my component to Jeff's product description page means that his links for reviews (id ReviewsSection) and description (id DescriptionSection) will need to navigate to those elements of the page and use the toggleOpen functions in appDescription.jsx and appReview.jsx files. I believe using ref hooks (see https://reactjs.org/docs/refs-and-the-dom.html )can accomplish this, but let me know if I can help sort this out.

From the database directory:
Use 'mysql -u root < mySchema.sql' to initialize and setup the database (changing the mysql login to fit your requirements).
Use 'npm seed' to seed the database


## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- @babel/core 7.6.3
- @babel/preset-env 7.6.3
- @babel/preset-react 7.6.3
- babel-loader 8.0.6
- babel-preset-react 6.24.1
- body-parser 1.19.0
- express 4.17.1
- mysql 2.17.1
- react 16.10.2
- react-dom 16.10.2
- styled-components 4.4.0
- webpack 4.41.0
- webpack-cli 3.3.9

## Development
- casual 1.6.2
- eslint-config-hackreactor
- jest 24.9.0
- nodemon 1.19.3
- supertest 4.0.2

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

