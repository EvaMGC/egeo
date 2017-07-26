import { join } from 'path';
import { copyFiles } from './copy-files';
import { generateDocs } from './generate-docs';
import { addPureAnnotationsToFile } from './pure-annotations';
import { updatePackageVersion } from './package-versions';
import { inlinePackageMetadataFiles } from './metadata-inlining';
import { createTypingsReexportFile } from './typings-reexport';
import { createMetadataReexportFile } from './metadata-reexport';
import { buildConfig } from './build-config';

const { packagesDir, outputDir, projectDir } = buildConfig;

/** Directory where all bundles will be created in. */
const bundlesDir = join(outputDir, 'bundles');

/**
 * Copies different output files into a folder structure that follows the `angular/angular`
 * release folder structure. The output will also contain a README and the according package.json
 * file. Additionally the package will be Closure Compiler and AOT compatible.
 */
export function composeRelease(packageName: string): void {
   // To avoid refactoring of the project the package egeo will map to the source path `lib/`.
   const sourcePath = join(packagesDir, packageName === 'egeo' ? 'lib' : packageName);
   const packagePath = join(outputDir, 'packages', packageName);
   const releasePath = join(outputDir, 'releases', packageName);

   inlinePackageMetadataFiles(packagePath);

   copyFiles(packagePath, '**/*.+(d.ts|metadata.json)', join(releasePath, 'typings'));
   copyFiles(bundlesDir, `${packageName}.umd?(.min).js?(.map)`, join(releasePath, 'bundles'));
   copyFiles(bundlesDir, `${packageName}?(.es5).js?(.map)`, join(releasePath, '@stratio'));
   copyFiles(projectDir, 'LICENSE', releasePath);
   copyFiles(packagesDir, 'README.md', releasePath);
   copyFiles(sourcePath, 'package.json', releasePath);
   if (packageName === 'egeo') {
      copyFiles(projectDir, 'CHANGELOG.md', releasePath);
      generateDocs(sourcePath, '**/README.md', releasePath);
   }

   updatePackageVersion(releasePath);
   createTypingsReexportFile(releasePath, packageName);
   createMetadataReexportFile(releasePath, packageName);
   addPureAnnotationsToFile(join(releasePath, '@stratio', `${packageName}.es5.js`));
}
