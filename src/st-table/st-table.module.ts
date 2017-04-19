import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StTableCellComponent } from './shared/st-table-cell/st-table-cell.component';
import { StTableRowComponent } from './shared/st-table-row/st-table-row.component';
import { StTableComponent } from './st-table.component';

@NgModule({
   imports: [CommonModule],
   declarations: [StTableCellComponent, StTableComponent, StTableRowComponent],
   exports: [StTableCellComponent, StTableComponent, StTableRowComponent]
})

export class StTableModule {
}
