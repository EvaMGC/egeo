import { sync as glob } from 'glob';
import { mkdirpSync, copySync, readFileSync, writeFileSync, readdirSync } from 'fs-extra';
import { join, dirname, basename } from 'path';
import { Converter } from 'showdown';
import { html_beautify } from 'js-beautify';

import { buildConfig } from './build-config';

const { mdPath, htmlPath, docPath } = buildConfig;

export function generateDocs(fromPath: string, fileGlob: string, outDir: string): void {
   const docsOutDir: string = join(outDir, docPath);
   copyDocFiles(fromPath, fileGlob, docsOutDir);
   generateIndex(docsOutDir);
   generateHtmlFromMd(docsOutDir);
}


function copyDocFiles(fromPath: string, fileGlob: string, outDir: string): void {
   glob(fileGlob, { cwd: fromPath }).forEach(filePath => {
      const fileDest = join(outDir, mdPath, `${dirname(filePath)}.md`);
      mkdirpSync(outDir);
      copySync(join(fromPath, filePath), fileDest);
   });
}

function generateIndex(outDir: string): void {
   const mdFullPath: string = join(outDir, mdPath);

   const indexContent: string = `# Table of Contents\n${buildIndex(outDir)}`;
   writeFileSync(join(mdFullPath, 'index.md'), indexContent);
}

function buildIndex(outDir: string): string {
   const mdFullPath: string = join(outDir, mdPath);
   return glob('**/*.md', { cwd: mdFullPath })
      .map(_ => `- [${basename(_, '.md')}](${_})`).join('\n');
}

function generateHtmlFromMd(outDir: string): void {
   const mdFullPath: string = join(outDir, mdPath);
   const htmlFullPath: string = join(outDir, htmlPath);
   mkdirpSync(htmlFullPath);

   const converter = new Converter({
      tables: true,
      ghCodeBlocks: true,
      tasklists: true,
      tablesHeaderId: true
   });
   let mdContent: string;
   let html: string;
   glob('**/*.md', { cwd: mdFullPath }).forEach(filePath => {
      mdContent = readFileSync(join(mdFullPath, filePath), 'utf-8');
      html = buildHTMLFile(converter.makeHtml(mdContent), basename(filePath, '.md') === 'index');
      writeFileSync(join(htmlFullPath, `${basename(filePath, '.md')}.html`), html);
   });
}

// tslint:disable:max-line-length
function buildHTMLFile(content: string, index: boolean): string {
   let htmlContent: string = index ? content.replace(/\.md/gm, '.html') : content;
   htmlContent = htmlContent.replace(/\<table\>/gm, '<table class="table table-striped">');

   return html_beautify(`
      <!doctype html>
      <html lang="en">

      <head>
         <meta charset="utf-8">
         <title>Stratio Egeo - Documentation</title>
         <base href="/">

         <meta name="viewport" content="width=device-width, initial-scale=1">
         <link rel="shortcut icon" type="image/png" href="assets/images/favicon.png">
         <link rel="stylesheet" href= "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity= "sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin= "anonymous" >
         <link rel="stylesheet" href= "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity= "sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin= "anonymous" >
      </head>

      <body class="container-fluid">
         ${index ? '' : '<a href="/index.html">Go Back to index</a><br>'}
         ${htmlContent}
      </body>

      </html>
   `);
}
// tslint:enable

