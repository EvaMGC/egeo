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
import { task } from 'gulp';
import { readFileSync } from 'fs';
import { join } from 'path';
import { green, red } from 'chalk';
import { releasePackages } from './egeo-publish';
import { buildConfig, sequenceTask } from 'build-tools';

/** Path to the directory where all releases are created. */
const releasesDir = join(buildConfig.outputDir, 'releases');

/** RegExp that matches Angular component inline styles that contain a sourcemap reference. */
const inlineStylesSourcemapRegex = /styles: ?\[["'].*sourceMappingURL=.*["']/;
/** RegExp that matches Angular component metadata properties that refer to external resources. */
const externalReferencesRegex = /(templateUrl|styleUrls): *["'[]/;

task('validate-release', sequenceTask(':publish:build-releases', 'validate-release:check-bundles'));

/** Task that checks the release bundles for any common mistakes before releasing to the public. */
task('validate-release:check-bundles', () => {
   const releaseFailures = releasePackages
      .map(packageName => checkReleasePackage(packageName))
      .map((failures, index) => ({ failures, packageName: releasePackages[index] }));

   releaseFailures.forEach(({ failures, packageName }) => {
      failures.forEach(failure => console.error(red(`Failure (${packageName}): ${failure}`)));
   });

   if (releaseFailures.some(({ failures }) => failures.length > 0)) {
      // Throw an error to notify Gulp about the failures that have been detected.
      throw 'Release output is not valid and not ready for being released.';
   } else {
      console.log(green('Release output has been checked and everything looks fine.'));
   }
});

/** Task that validates the given release package before releasing. */
function checkReleasePackage(packageName: string): string[] {
   const bundlePath = join(releasesDir, packageName, '@stratio', `${packageName}.js`);
   const bundleContent = readFileSync(bundlePath, 'utf8');
   let failures = [];

   if (inlineStylesSourcemapRegex.exec(bundleContent) !== null) {
      failures.push('Bundles contain sourcemap references in component styles.');
   }

   if (externalReferencesRegex.exec(bundleContent) !== null) {
      failures.push('Bundles are including references to external resources (templates or styles)');
   }
   return failures;
}
