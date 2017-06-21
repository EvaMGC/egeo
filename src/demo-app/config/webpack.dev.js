/*
 * Copyright (C) 2016 Stratio (http://stratio.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const helpers = require('./helpers');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev

const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const webpackMergeDll = webpackMerge.strategy({ plugins: 'replace' });

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;
const HMR = helpers.hasProcessFlag('hot');


const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const DllBundlesPlugin = require('webpack-dll-bundles-plugin').DllBundlesPlugin;

module.exports = function (options) {
   console.log('\n\n******************************* DEVELOPMENT *******************************\n\n');
   return webpackMerge(commonConfig({ env: ENV }), {

      devtool: 'inline-source-map',

      output: {
         path: helpers.root('dist'),
         filename: '[name].js',
         sourceMapFilename: '[name].map',
         chunkFilename: '[id].chunk.js',
         library: 'ac_[name]',
         libraryTarget: 'var',


      },
 module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
          include: [helpers.root('styles')]
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
          include: [helpers.root('styles')]
        },

      ]

    },
      plugins: [
         new LoaderOptionsPlugin({
            debug: true,
            options: { }
         }),
         new DllBundlesPlugin({
            bundles: {
               polyfills: [
                  'core-js',
                  {
                     name: 'zone.js',
                     path: 'zone.js/dist/zone.js'
                  },
                  {
                     name: 'zone.js',
                     path: 'zone.js/dist/long-stack-trace-zone.js'
                  }
               ],
               vendor: [
                  '@angular/platform-browser',
                  '@angular/platform-browser-dynamic',
                  '@angular/core',
                  '@angular/common',
                  '@angular/forms',
                  '@angular/http',
                  '@angular/router',
                  '@angularclass/hmr',
                  'rxjs',
               ]
            },
            dllDir: helpers.root('temp', 'dll'),
            webpackConfig: webpackMergeDll(commonConfig({ env: ENV }), {
               devtool: 'cheap-module-source-map',
               plugins: []
            })
         }),
         new AddAssetHtmlPlugin([
            { filepath: helpers.root(`temp/dll/${DllBundlesPlugin.resolveFile('polyfills')}`) },
            { filepath: helpers.root(`temp/dll/${DllBundlesPlugin.resolveFile('vendor')}`) }
         ]),
      ],

      devServer: {
         port: PORT,
         host: HOST,
         historyApiFallback: true,
         stats: "errors-only",
         clientLogLevel: "warning"
      },
      node: {
         global: true,
         crypto: 'empty',
         process: true,
         module: false,
         clearImmediate: false,
         setImmediate: false
      }
   });
}
