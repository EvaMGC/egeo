import {StObjectToArrayPipe} from "./st-object-to-array.pipe";

class FakeClass {
   private name: string;
   private lastName: string;

   constructor(name, lastName) {
      this.name = name;
      this.lastName = lastName;
   }

}

describe('Pipe: StObjectToArrayPipe', () => {
   let pipe: any;
   let fakeJSON: any = {
      server1: {
         available: true,
         ip: "1.1.1.1"
      },
      server2: {
         available: false,
         ip: "0.0.0.0"
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

            expect(array[0].key).toEqual("server1");
            expect(array[0].value.available).toBe(fakeJSON.server1.available);
            expect(array[0].value.ip).toEqual(fakeJSON.server1.ip);

            expect(array[1].key).toEqual("server2");
            expect(array[1].value.available).toBe(fakeJSON.server2.available);
            expect(array[1].value.ip).toEqual(fakeJSON.server2.ip);
         });

         it('only own properties are added to the array', () => {
            let fakeObject = new FakeClass('fake name', 'fake last name');

            // force to exclude the property 'name' from its own properties
            spyOn(Object.prototype, 'hasOwnProperty').and.callFake((property: string) => {
               return property !== 'name';
            });

            let array: [any] = pipe.transform(fakeObject);

            expect(array.length).toBe(1);
            expect(array[0].key).toEqual("lastName");
         });
      });
   });
});
