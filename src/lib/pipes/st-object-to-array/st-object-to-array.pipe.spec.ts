/*
 * Copyright (C) 2016 Stratio (http://stratio.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {StObjectToArrayPipe} from './st-object-to-array.pipe';

class FakeClass {
   private name: string;
   private lastName: string;

   constructor(name: string, lastName: string) {
      this.name = name;
      this.lastName = lastName;
   }

}

describe('Pipe: StObjectToArrayPipe', () => {
   let pipe: any;
   let fakeJSON: any = {
      server1: {
         available: true,
         ip: '1.1.1.1'
      },
      server2: {
         available: false,
         ip: '0.0.0.0'
      }
   };

   beforeEach(() => {
      pipe = new StObjectToArrayPipe();
   });


   describe(('It should transform a json in an array'), () => {

      it('If object is undefined or empty, it returns an empty array', () => {
         expect(pipe.transform()).toEqual([]);
         expect(pipe.transform(undefined)).toEqual([]);
         expect(pipe.transform(null)).toEqual([]);
         expect(pipe.transform({})).toEqual([]);
      });

      describe('If object is valid', () => {

         it('It returns an array of JSONs with the key and value of each property', () => {
            let array: [any] = pipe.transform(fakeJSON);

            expect(array[0].key).toEqual('server1');
            expect(array[0].value.available).toBe(fakeJSON.server1.available);
            expect(array[0].value.ip).toEqual(fakeJSON.server1.ip);

            expect(array[1].key).toEqual('server2');
            expect(array[1].value.available).toBe(fakeJSON.server2.available);
            expect(array[1].value.ip).toEqual(fakeJSON.server2.ip);
         });
      });
   });
});
