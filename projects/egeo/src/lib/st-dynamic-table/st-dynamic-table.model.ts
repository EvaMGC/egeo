import { StTableHeader } from '../';


export interface StDynamicTableHeader extends StTableHeader {
   reference: string;
   fk?: StDynamicTableFk;
   group?: string;
   type?: Array<{field: string; type: string}>;
   sortedByDefault?: string;
}

export interface StDynamicTableFkEvent {
   fk?: StDynamicTableFk;
   value: string | number;
}

export interface StDynamicTableUISpecification {
   sortable?: boolean;
   sort?: string;
   styles?: {
      [key: string]: string;
   };
   fk?: StDynamicTableFk;
   group_field?: {
      view: string;
      fkTable: string;
   };
   templateRef?: string;
   visible?: boolean;
}


export interface StDynamicTableUserInterface {
   [key: string]: StDynamicTableUISpecification;
}

export interface StDynamicTableFk {
   table: string;
   field: string;
}
