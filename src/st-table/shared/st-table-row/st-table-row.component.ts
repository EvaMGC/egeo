import {
   ChangeDetectionStrategy, Component, HostListener, Input
} from '@angular/core';

@Component({
   selector: '[st-table-row]',
   templateUrl: './st-table-row.component.html',
   styleUrls: ['./st-table-row.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   host: {
      'class': 'sth-table-row',
      '[class.sth-table-row--compacted]': 'compacted'
   }
})

export class StTableRowComponent {
   @Input() compacted: boolean = false;

   public showHoverMenu: boolean = false;

   @HostListener('mouseover') onShowHoverMenu(): void {
      this.showHoverMenu = true;
   };

   @HostListener('mouseout') onHideHoverMenu(): void {
      this.showHoverMenu = false;
   };
}

