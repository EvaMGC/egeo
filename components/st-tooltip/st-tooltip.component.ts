import { Component, Input, ElementRef, Renderer, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy} from '@angular/core';

import { EventWindowManager } from '../utils';

@Component({
   selector: 'st-tooltip',
   templateUrl: './st-tooltip.component.html',
   styleUrls: ['./st-tooltip.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StTooltip extends EventWindowManager implements OnDestroy {

   @Input() text: string = '';
   @Input() showOnClick: boolean;
   @Input() qaTag: string;

   constructor(private elementRef: ElementRef, private renderer: Renderer, private cd: ChangeDetectorRef) {
      super(renderer, cd, elementRef);
   }

   openTooltip(): void {
      this.openElement();
   }

   openTooltipOnHover(): void {
      if (!this.showOnClick) {
         this.forceCloseOther();
         this.isActive = true;
      }
   }

   closeTooltipOnHover(): void {
      if (!this.showOnClick) {
         this.isActive = false;
      }
   }

   ngOnDestroy(): void {
      this.closeElement();
   }

}
