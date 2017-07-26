import { findBuildConfig } from './find-build-config';

export interface BuildConfig {
   /** Current version of the project. */
   projectVersion: string;
   /** Path to the root of the project. */
   projectDir: string;
   /** Path to the directory where all packages are living. */
   packagesDir: string;
   /** Path to the directory where the output will be stored. */
   outputDir: string;
   /** License banner that will be placed inside of every bundle. */
   licenseBanner: string;
   /** Path where docs be puts in release (Inside release module path) */
   docPath: string;
   /** Html files path name inside docs path */
   htmlPath: string;
   /** markdown files path name inside docs path */
   mdPath: string;
}

// Search for a build config by walking up the current working directory of the Node process.
const buildConfigPath = findBuildConfig();

if (!buildConfigPath) {
   throw 'Please create a "build-config.js" file in your project.';
}

// Load the config file using a basic CommonJS import.
export const buildConfig = require(buildConfigPath) as BuildConfig;
