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
/* tslint:disable:no-eval */

import { dirname, join } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { sync as glob } from 'glob';

/** Finds all JavaScript files in a directory and inlines all resources of Angular components. */
export function inlineResourcesForDirectory(folderPath: string): void {
   glob(join(folderPath, '**/*.js')).forEach(filePath => inlineResources(filePath));
}

/** Inlines the external resources of Angular components of a file. */
export function inlineResources(filePath: string): void {
   let fileContent = readFileSync(filePath, 'utf-8');

   fileContent = inlineTemplate(fileContent, filePath);
   fileContent = inlineStyles(fileContent, filePath);
   fileContent = removeModuleId(fileContent);

   writeFileSync(filePath, fileContent, { encoding: 'utf-8' } );
}

/** Inlines the templates of Angular components for a specified source file. */
function inlineTemplate(fileContent: string, filePath: string): string {
   return fileContent.replace(/templateUrl:\s*'([^']+?\.html)'/g, (_match, templateUrl) => {
      const templatePath = join(dirname(filePath), templateUrl);
      const templateContent = loadResourceFile(templatePath);
      return `template: "${templateContent}"`;
   });
}

/** Inlines the external styles of Angular components for a specified source file. */
function inlineStyles(fileContent: string, filePath: string): string {
   return fileContent.replace(/styleUrls:\s*(\[[\s\S]*?])/gm, (_match, styleUrlsValue) => {
      // The RegExp matches the array of external style files. This is a string right now and
      // can to be parsed using the `eval` method. The value looks like "['AAA.css', 'BBB.css']"
      const styleUrls = eval(styleUrlsValue) as string[];

      const styleContents = styleUrls
         .map(url => join(dirname(filePath), url.replace('.scss', '.css')))
         .map(path => loadResourceFile(path));

      return `styles: ["${styleContents.join(' ')}"]`;
   });
}

/** Remove every mention of `moduleId: module.id` */
function removeModuleId(fileContent: string): string {
   return fileContent.replace(/\s*moduleId:\s*module\.id\s*,?\s*/gm, '');
}

/** Loads the specified resource file and drops line-breaks of the content. */
function loadResourceFile(filePath: string): string {
   return readFileSync(filePath, 'utf-8')
      .replace(/([\n\r]\s*)+/gm, ' ')
      .replace(/"/g, '\\"');
}
