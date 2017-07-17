/* tslint:disable:no-eval */
import { join } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { sync as glob } from 'glob';

/** Finds all JavaScript files in a directory and inlines all resources of Angular components. */
export function renameScssForCssInFolder(folderPath: string): void {
   glob(join(folderPath, '**/*.ts')).forEach(filePath => renameResources(filePath));
}

/** Inlines the external resources of Angular components of a file. */
export function renameResources(filePath: string): void {
   let fileContent = readFileSync(filePath, 'utf-8');

   fileContent = renameScssForCss(fileContent);
   writeFileSync(filePath, fileContent, 'utf-8');
}

/** Inlines the external styles of Angular components for a specified source file. */
function renameScssForCss(fileContent: string): string {
   return fileContent.replace(/styleUrls:\s*(\[[\s\S]*?])/gm, (_match, styleUrlsValue) => {
      // The RegExp matches the array of external style files. This is a string right now and
      // can to be parsed using the `eval` method. The value looks like "['AAA.css', 'BBB.css']"
      const styleUrls = eval(styleUrlsValue) as string[];
      const styleContents = styleUrls
         .map(url => url.replace('.scss', '.css'));

      return `styles: ["${styleContents.join(', ')}"]`;
   });
}
