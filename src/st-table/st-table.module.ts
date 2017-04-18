import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StTableComponent } from "./st-table.component";
import { StTableRowComponent } from "./shared/st-table-row/st-table-row.component";
import { StTableCellComponent } from "./shared/st-table-cell/st-table-cell.component";

@NgModule({
   imports: [CommonModule],
   declarations: [StTableComponent, StTableRowComponent, StTableCellComponent],
   exports: [StTableComponent, StTableRowComponent, StTableCellComponent]
})
export class StTableModule { }
