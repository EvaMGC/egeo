export enum ORDER_TYPE { ASC, DESC };

export class Order {
   constructor(
      public orderBy: string,
      public type: ORDER_TYPE
   ) { }
}
