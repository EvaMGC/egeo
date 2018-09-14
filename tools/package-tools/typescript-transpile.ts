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
import * as ts from 'typescript';
import * as path from 'path';
import * as fs from 'fs';
import * as chalk from 'chalk';

/** Reads a input file and transpiles it into a new file. */
export function transpileFile(inputPath: string, outputPath: string, options: ts.CompilerOptions): void {
   const inputFile = fs.readFileSync(inputPath, 'utf-8');
   const transpiled = ts.transpileModule(inputFile, { compilerOptions: options });

   if (transpiled.diagnostics) {
      reportDiagnostics(transpiled.diagnostics);
   }

   fs.writeFileSync(outputPath, transpiled.outputText);

   if (transpiled.sourceMapText) {
      fs.writeFileSync(`${outputPath}.map`, transpiled.sourceMapText);
   }
}

/** Formats the TypeScript diagnostics into a error string. */
function formatDiagnostics(diagnostics: ts.Diagnostic[], baseDir: string = ''): string {
   return diagnostics.map(diagnostic => {
      let res = `• ${chalk.red(`TS${diagnostic.code}`)} - `;

      if (diagnostic.file) {
         const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(<number>diagnostic.start);
         const filePath = path.relative(baseDir, diagnostic.file.fileName);

         res += `${filePath}(${line + 1},${character + 1}): `;
      }
      res += `${ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')}`;

      return res;
   }).join('\n');
}

/** Checks and reports diagnostics if present. */
function reportDiagnostics(diagnostics: ts.Diagnostic[], baseDir?: string): void {
   if (diagnostics && diagnostics.length && diagnostics[0]) {
      console.error(formatDiagnostics(diagnostics, baseDir));
      throw new Error('TypeScript compilation failed.');
   }
}
