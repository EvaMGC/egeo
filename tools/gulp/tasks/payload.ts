import { spawnSync } from 'child_process';
import { task } from 'gulp';
import { join } from 'path';
import { statSync } from 'fs';

import { buildConfig } from 'build-tools';

/** Path to the directory where all bundles are living. */
const bundlesDir = join(buildConfig.outputDir, 'bundles');

/** Task which runs test against the size of whole library. */
task('payload', ['library:clean-build'], () => {

   let results = {
      umd_kb: getBundleSize('egeo.umd.js'),
      umd_minified_uglify_kb: getBundleSize('egeo.umd.min.js'),
      fesm_2015: getBundleSize('egeo.js'),
      fesm_2014: getBundleSize('egeo.es5.js'),
      timestamp: Date.now()
   };

   // Print the results to the console, so we can read it from the CI.
   console.log('Payload Results:', JSON.stringify(results, null, 2));
});

/** Returns the size of the given library bundle. */
function getBundleSize(bundleName: string): number {
   return getFilesize(join(bundlesDir, bundleName));
}

/** Returns the size of a file in kilobytes. */
function getFilesize(filePath: string): number {
   return statSync(filePath).size / 1000;
}
