/*
 * © 2017 Stratio Big Data Inc., Sucursal en España.
 *
 * This software is licensed under the Apache License, Version 2.0.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the terms of the License for more details.
 *
 * SPDX-License-Identifier: Apache-2.0.
 */

import * as child_process from 'child_process';
import * as gulp from 'gulp';

const gulpClean = require('gulp-clean');


/** Options that can be passed to execTask or execNodeTask. */
export interface ExecTaskOptions {
   // Whether STDOUT and STDERR messages should be printed.
   silent?: boolean;
   // Whether STDOUT messages should be printed.
   silentStdout?: boolean;
   // If an error happens, this will replace the standard error.
   errMessage?: string;
   // Environment variables being passed to the child process.
   env?: any;
   // Whether the task should fail if the process writes to STDERR.
   failOnStderr?: boolean;
 }

/** Create a task that executes a binary as if from the command line. */
export function execTask(binPath: string, args: string[], options: ExecTaskOptions = {}): any {
   return (done: (err?: string) => void) => {
     const env = Object.assign({}, process.env, options.env);
     const childProcess = child_process.spawn(binPath, args, {env});
     const stderrData: string[] = [];

     if (!options.silentStdout && !options.silent) {
       childProcess.stdout.on('data', (data: string) => process.stdout.write(data));
     }

     if (!options.silent || options.failOnStderr) {
       childProcess.stderr.on('data', (data: string) => {
         options.failOnStderr ? stderrData.push(data) : process.stderr.write(data);
       });
     }

     childProcess.on('close', (code: number) => {
       if (options.failOnStderr && stderrData.length) {
         done(stderrData.join('\n'));
       } else {
         code !== 0 ? done(options.errMessage || `Process failed with code ${code}`) : done();
       }
     });
   };
 }

/** Delete files. */
export function cleanTask(glob: string): any {
   return () => gulp.src(glob, { read: false }).pipe(gulpClean(null));
}
