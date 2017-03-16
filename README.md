[![issuestats pr](http://issuestats.com/github/stratio/egeo/badge/pr?style=flat-square)
[![issustats issues](http://issuestats.com/github/stratio/egeo/badge/issue?style=flat-square)

<div align="center">
<img src="https://github.com/Stratio/egeo-web/blob/master/src/assets/images/egeo_logo_c.png">
</div>

# Egeo

EGEO is the open-source component library used to build Stratio's UI. The goals are to reduce the time and complexity of interface building being more productive, improving the experience based in apply the same patterns and visuals across the whole Stratio applications being more consistent, and create a common and unified visual language that helps us to understand each other better laying the foundation for scalable growth.

In this repository, you'll find UI components, services and utilities but this is only one part of the project. You can discover more in:

* [egeo-web](https://github.com/Stratio/egeo-web): The official website of Egeo where documentation will be available soon.
* [egeo-ui-base](https://github.com/Stratio/egeo-ui-base): A Sass library that helps us to build our styles, including a rewritten Sass version of [flexboxgrid](http://flexboxgrid.com/).
* [egeo-theme](https://github.com/Stratio/egeo-theme): The egeo components are thematizable. This is the official theme used in the Stratio's applications.
* [egeo-starter](https://github.com/Stratio/egeo-starter): A Boilerplate project prepared for work with Egeo 1.x, Angular 2.x, TypeScript, Webpack, Karma, Jasmine and Sass.

## Table of contents

* [About this repo](#about-this-repo)
* [File Structure](#file-structure)
* [Getting Started](#getting-started)
   * [Dependencies](#dependencies)
   * [Installing](#installing)
   * [How to run](#how-to-run)
   * [How to test](#how-to-test)
   * [How to build](#how-to-build)
* [Contributing](#contributing)
* [License](#license)

## About this Repo

This repo includes the components, services, and utilities built in Angular. The library is compiled with AoT for distribution and each component is provided as a module that can be imported separately in your project.

We are also using [HMR](https://github.com/AngularClass/angular2-hmr) and [DLL](https://robertknight.github.io/posts/webpack-dll-plugins/) to dramatically speed your builds.

* Documentation website (soon)

## File Structure

```
angular2-webpack-starter/
 ├──config/                        * our configuration
 |   ├──empty.js                   * special file needed for webpack
 |   ├──helpers.js                 * utilities file for webpack
 |   ├──karma.conf.js              * karma config for our unit tests
 |   ├──resource-override.js       * special file needed for webpack
 │   ├──spec-bundle.js             * index generator of spec files for testing
 │   ├──webpack.components.js      * Webpack configuration
 |   └──webpack.test.js            * specifical configuration for execute karma
 │
 ├──src/                           * our source files
 |   ├──decorators/                * decorators for components
 |   ├──pipes/                     * filters for components
 |   ├──utils/                     * utilities
 │   ├──st-*/                      * folder of each component
 |   ├──egeo.module.ts             * library main module
 |   ├──index.ts                   * this file indicates what will be exported
 |   └──modules.ts                 * declares the list of modules will be added to the main module
 │
 ├──.htmlhintrc                    * our htmlhint linting configuration
 ├──.sass-lint.yml                 * our sass linting configuration
 ├──tslint.json                    * typescript lint config
 ├──jenkinsfile                    * configuration of our jenkins process
 ├──gulpfile.js                    * gulp tasks definition needed to generate de distribution
 ├──karma.conf.js                  * index file for the karma configuration
 ├──pom.xml                        * configuration to work with our CI system
 ├──tsconfig.lib.json              * settings of typescript to build the library using webpack
 ├──tsconfig.gulp.json             * settings of typescript to build the library using gulp
 ├──tsconfig.json                  * default settings of typescript
 ├──package.json                   * what npm uses to manage it's dependencies
 └──yarn.lock                      * need in order to get consistent installs across machines using yarn

```

## Getting Started

### Dependencies

What you need to run this app:
* [`node`](https://nodejs.org/es/) and `npm`
* Ensure you're running the latest versions Node `v6.x.x` and NPM `4.x.x`+

What your app will need to work with Egeo:
* angular/common ~ 2.4.6",
* angular/core ~ 2.4.6",
* angular/forms ~ 2.4.6",
* angular/http ~ 2.4.6",
* angular/platform-browser-dynamic ~ 2.4.6",
* angular/Router ~ 3.4.6
* Lodash 4.17.4
* Reflect Metadata ~ 0.1.9
* Typescript 2.0.x
* Angular2 Virtual Scroll ~ 0.1.3

### Installing

You can use Npm or Yarn to work with Egeo. If you want to use Yarn, it has to be installed first as a global dependency in your local machine.

```
sudo npm i -g yarn
```

Once Yarn is installed or Npm is ready, you can install Egeo using:

```
yarn
```

or

```
npm install
```

### How to Run

To run egeo locally you must use this commands.

```
yarn start
```

or

```
npm run start
```

### How to Test

There is a command to start the karma server and launch the whole tests written for the librery.

```
yarn test
```

or

```
npm run test
```

### How to Build

If you want to build a distributable package you must use the `build` command. This will create a **target** folder with the distributable code of the package.

```
yarn build
```

or

```
npm run build
```

## Contributing

There are many ways to contribute to the Egeo project. [Check our contribution section in the Wiki to learn more](https://github.com/Stratio/egeo/wiki/How-to-contribute).

## License

Egeo is distributed under the Apache 2 license. You may obtain a copy of the license here at:

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)
