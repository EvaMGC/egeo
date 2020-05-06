import { StTableHeader } from '../';


export interface StDynamicTableHeader extends StTableHeader {
   reference: string;
}

export interface StDynamicTableUISpecification {
   sortable?: boolean;
   styles?: {
      [key: string]: string;
   };
}


export interface StDynamicTableUserInterface {
   [key: string]: StDynamicTableUISpecification;
}
