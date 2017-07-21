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

'use strict';

const path = require('path');

function parseTestPattern(argv) {
   var found = false;
   var pattern = argv.map(function(v) {
      if (found) {
         return v;
      }
      if (v === '--') {
         found = true;
      }
   }).
   filter(function(a) {
      return a
   }).
   join(' ');
   return pattern ? ['--grep', pattern] : [];
}

var args = parseTestPattern(process.argv);

module.exports = function(config) {
   config.set({
      basePath: path.join(__dirname, '..'),
      files: [{
            pattern: 'test/base.spec.ts'
         },
         {
            pattern: 'src/lib/**/*.+(ts|html)'
         }
      ],
      client: {
         args: args
      },
      frameworks: ['jasmine', 'karma-typescript'],
      karmaTypescriptConfig: {
         tsconfig: 'src/lib/tsconfig-test.json',
         bundlerOptions: {
            directories: [
               path.resolve(process.cwd(), 'node_modules'),
               path.resolve(process.cwd(), 'src/lib')
            ],
            entrypoints: /\.spec\.ts$/,
            transforms: [
               require("karma-typescript-angular2-transform")
            ]
         },
         coverageOptions: {
            exclude: /(\.d\.ts|\.spec\.ts|\.module\.ts|\.routing\.ts|barrels\.ts|public_api\.ts|demo)/i,
            instrumentation: true
         },
         reports: {
            'cobertura': {
               'directory': 'target',
               'subdirectory': '.',
               'filename': 'coverage.xml'
            },
            'text-summary': null,
            'html': './target/coverage/html',
            'json': './target/coverage',
            'lcovonly': './target/lcovUT.info'
         }
      },

      preprocessors: {
         "src/lib/**/*.ts": ["karma-typescript"],
         "test/**/*.ts": ["karma-typescript"]
      },
      reporters: ['mocha', 'karma-typescript'],
      mochaReporter: {
         ignoreSkipped: args && args.length > 0
      },

      logLevel: config.LOG_INFO,
      autoWatch: false,
      singleRun: true,
      failOnEmptyTestSuite: false,
      browsers: ['PhantomJS'],
      phantomJsLauncher: {
         exitOnResourceError: true
      }
   });
};
