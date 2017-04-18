import {
   ChangeDetectionStrategy, Component, Input, Renderer, ElementRef, ChangeDetectorRef
} from '@angular/core';
import { CheckRequired } from "../../../decorators";

@CheckRequired()
@Component({
   selector: '[st-table-row]',
   templateUrl: './st-table-row.component.html',
   styleUrls: ['./st-table-row.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   host: {
      '[class.st-table-row--compacted]': 'compacted'
   }
})

export class StTableRowComponent {
   @Input() compacted: boolean = false;

   public showHoverMenu = false;

   constructor(private elementRef: ElementRef, private renderer: Renderer, private cd: ChangeDetectorRef) {
      this.renderer.listen(this.elementRef.nativeElement, 'mouseover', () => {
         this.showHoverMenu = true;
         this.cd.markForCheck();
      });
      this.renderer.listen(this.elementRef.nativeElement, 'mouseout', () => {
         this.showHoverMenu = false;
         this.cd.markForCheck();
      });
   };
}
