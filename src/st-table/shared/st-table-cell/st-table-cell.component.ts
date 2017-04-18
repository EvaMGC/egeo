import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CheckRequired } from '../../../decorators';

@CheckRequired()
@Component({
   selector: '[st-table-cell]',
   templateUrl: './st-table-cell.component.html',
   styleUrls: ['./st-table-cell.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})

export class StTableCellComponent {
}
