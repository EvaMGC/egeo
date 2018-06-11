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
import { task, src, dest } from 'gulp';
import { join } from 'path';
import { writeFileSync, mkdirpSync } from 'fs-extra';
import { Bundler } from 'scss-bundle';

import { buildConfig, buildScssFromFileTask, sequenceTask } from 'build-tools';

const { projectDir, packagesDir, outputDir } = buildConfig;

const assetsSource = join(projectDir, 'assets');
const themeSourceFolder = join(packagesDir, 'theme');

const themeSourceFile = join(themeSourceFolder, 'theme.scss');
const gridSourceFile = join(themeSourceFolder, 'grid', 'grid.scss');
const sanitizeSourceFile = join(themeSourceFolder, 'vendors', 'sanitize.scss');
const constantsSourceFile = join(themeSourceFolder, 'constants', '_index.scss');

const packageOut = join(outputDir, 'releases', 'egeo', 'theme');
const constantsOutputFile = 'constants.scss';
const themeScssOutputFile = 'egeo-theme-stratio.scss';


// Tasks
task('styles:theme', buildScssFromFileTask(packageOut, themeSourceFile, true));
task('styles:grid', buildScssFromFileTask(packageOut, gridSourceFile, true));
task('styles:sanitize', buildScssFromFileTask(packageOut, sanitizeSourceFile, true));
task('styles:copy-fonts', () => src(join(assetsSource, '/**/*')).pipe(dest(join(packageOut, 'assets'))));


task('styles:constans', () => {
   const allScssGlob = join(themeSourceFolder, '**/*.scss');
   return new Bundler().Bundle(constantsSourceFile, [allScssGlob]).then(result => {
      mkdirpSync(packageOut);
      writeFileSync(join(packageOut, constantsOutputFile), result.bundledContent, { encoding: 'utf-8' });
   });
});

task('styles:theme:scss', () => {
   const allScssGlob = join(themeSourceFolder, '**/*.scss');
   return new Bundler().Bundle(themeSourceFile, [allScssGlob]).then(result => {
      mkdirpSync(packageOut);
      writeFileSync(join(packageOut, themeScssOutputFile), result.bundledContent, { encoding: 'utf-8' });
   });
});

task('build:styles', ['styles:copy-fonts', 'styles:theme', 'styles:grid', 'styles:sanitize', 'styles:constans', 'styles:theme:scss']);
