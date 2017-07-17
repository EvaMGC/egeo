import { task } from 'gulp';
import { copySync } from 'fs-extra';
import { join } from 'path';


import { execNodeTask, tsBuildTask, copyTask, buildAppTask } from '../util/task_helpers';
import { renameScssForCssInFolder } from '../util/rename-scss';
import { buildConfig, sequenceTask, buildScssTask } from 'build-tools';

const { outputDir, packagesDir, projectDir } = buildConfig;

/** Path to the directory where all releases are living. */
const releasesDir = join(outputDir, 'releases');

/** Path to the demo-app output directory. */
const demoAppOut = join(outputDir, 'packages', 'demo-app');

/** Path to the tsconfig file that builds the AOT files. */
const tsconfigFile = join(demoAppOut, 'tsconfig-aot.json');

/** Builds the demo-app and egeo. To be able to run NGC, apply the metadata workaround. */
task('aot:deps', sequenceTask(
   'clean',
   'build:devapp',
   ['egeo:build-release', 'egeo-demo:build-release'],
   'aot:copy-release'
));

// As a workaround for https://github.com/angular/angular/issues/12249, we need to
// copy the Egeo and CDK ESM output inside of the demo-app output.
task('aot:copy-release', () => {
   copySync(join(releasesDir, 'egeo'), join(demoAppOut, 'egeo'));
   copySync(join(releasesDir, 'egeo-demo'), join(demoAppOut, 'egeo-demo'));
});

/** Build the demo-app and a release to confirm that the library is AOT-compatible. */
task('aot:build', sequenceTask('aot:deps', 'aot:compiler-cli'));

/** Build the demo-app and a release to confirm that the library is AOT-compatible. */
task('aot:compiler-cli', execNodeTask(
   '@angular/compiler-cli', 'ngc', ['-p', tsconfigFile]
));


/** Path to the demo-app tsconfig file. */
const appDir = join(packagesDir, 'demo-app');
const outDir = join(outputDir, 'packages', 'demo-app');
const tsconfigPath = join(appDir, 'tsconfig-build-gulp.json');

task(':build:devapp:ts', tsBuildTask(tsconfigPath));
task(':build:devapp:scss', buildScssTask(outDir, appDir));
task(':build:devapp:assets', copyTask(appDir, outDir));
task(':build:devapp:rename', () => renameScssForCssInFolder(outDir));
task(':build:compile-project', buildAppTask('devapp'));
task('build:devapp', sequenceTask(':build:compile-project', ':build:devapp:rename'));
