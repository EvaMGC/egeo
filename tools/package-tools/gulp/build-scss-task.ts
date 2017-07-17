import { src, dest } from 'gulp';
import { join } from 'path';

// These imports lack of type definitions.
const autoprefixer = require('autoprefixer');
const gulpCleanCss = require('gulp-clean-css');
const gulpIf = require('gulp-if');
const gulpSass = require('gulp-sass');
const gulpPostCss = require('gulp-postcss');

/** Create a gulp task that builds SCSS files. */
export function buildScssTask(outputDir: string, sourceDir: string, minifyOutput: boolean = false): any {
   return () => {
      return src(join(sourceDir, '**/*.scss'))
         .pipe(gulpSass().on('error', gulpSass.logError))
         .pipe(gulpPostCss([autoprefixer()]))
         .pipe(gulpIf(minifyOutput, gulpCleanCss()))
         .pipe(dest(outputDir));
   };
}
