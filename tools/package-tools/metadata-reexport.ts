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
import { writeFileSync } from 'fs';
import { join } from 'path';

/** Creates a metadata file that re-exports the metadata bundle inside of the typings. */
export function createMetadataReexportFile(packageDir: string, packageName: string): void {
   const metadataReExport = `{
    "__symbolic":"module",
    "version":3,"metadata":{},
    "exports":[{"from":"./typings/index"}],
    "flatModuleIndexRedirect": true
  }`;
   writeFileSync(join(packageDir, `${packageName}.metadata.json`), metadataReExport );
}
