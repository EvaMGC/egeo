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
import { spawn } from 'child_process';
import { existsSync, statSync } from 'fs-extra';
import { join } from 'path';
import { task } from 'gulp';
import { execTask } from '../util/task_helpers';
import { buildConfig, sequenceTask } from 'build-tools';
import { yellow, green, red, grey } from 'chalk';
import * as minimist from 'minimist';

/** Packages that will be published to NPM by the release task. */
export const releasePackages = [
   'egeo',
   'egeo-demo'
];

/** Parse command-line arguments for release task. */
const argv = minimist(process.argv.slice(3));

/** Task that builds all releases that will be published. */
task(':publish:build-releases', execTask('./node/npm', ['build']));

/** Make sure we're logged in. */
task(':publish:whoami', execTask('./node/npm', ['whoami'], {
   silent: false,
   errMessage: 'You must be logged in to publish.'
}));

function _execNpmPublish(label: string, packageName: string): Promise<{}> | undefined {
   const packageDir = join(buildConfig.outputDir, 'releases', packageName);

   if (!statSync(packageDir).isDirectory()) {
      return;
   }

   if (!existsSync(join(packageDir, 'package.json'))) {
      throw new Error(`"${packageDir}" does not have a package.json.`);
   }

   if (!existsSync(join(packageDir, 'LICENSE'))) {
      throw new Error(`"${packageDir}" does not have a LICENSE file`);
   }

   process.chdir(packageDir); // Change current node working directory to deploy path
   console.log(green(`Publishing ${packageName}...`));

   const command = 'npm';
   const args = ['publish', '--access', 'public'];

   if (label) {
      args.push('--tag', label);
   }

   return new Promise((resolve, reject) => {
      console.log(grey(`Executing: ${command} ${args.join(' ')}`));
      if (argv.dry) {
         resolve();
         return;
      }

      const childProcess = spawn(command, args);
      childProcess.stdout.on('data', (data: Buffer) => {
         console.log(`  stdout: ${data.toString().split(/[\n\r]/g).join('\n          ')}`);
      });
      childProcess.stderr.on('data', (data: Buffer) => {
         console.error(`  stderr: ${data.toString().split(/[\n\r]/g).join('\n          ')}`);
      });

      childProcess.on('close', (code: number) => {
         if (code === 0) {
            resolve();
         } else {
            reject(new Error(`Could not publish ${packageName}, status: ${code}.`));
         }
      });
   });
}

task(':publish', async () => {
   const label = argv.tag;
   const currentDir = process.cwd();

   console.log('');
   if (!label) {
      console.log(yellow('You can use a label with --tag=labelName.'));
      console.log(yellow('Publishing using the latest tag.'));
   } else {
      console.log(yellow(`Publishing using the ${label} tag.`));
   }
   console.log('');

   if (releasePackages.length > 1) {
      console.warn(red('Warning: Multiple packages will be released if proceeding.'));
   }

   // Iterate over every declared release package and publish it on NPM.
   for (const packageName of releasePackages) {
      await _execNpmPublish(label, packageName);
   }

   process.chdir(currentDir);
});

task('publish', sequenceTask(
   ':publish:whoami',
   ':publish:build-releases',
   ':publish'
));
