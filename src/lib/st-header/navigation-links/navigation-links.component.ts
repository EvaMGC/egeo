/*
 * Copyright (C) 2016 Stratio (http://stratio.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';

import { StHeaderModel } from '../st-header.model';

@Component({
   selector: 'navigation-links',
   styleUrls: ['./navigation-links.component.scss'],
   templateUrl: './navigation-links.component.html'
})
export class NavigationLinksComponent {

   @Input() menu: StHeaderModel[] = [];
   @Input() qaTag: string;

   @Output() positionChange: EventEmitter<number> = new EventEmitter<number>();

   constructor(private _cd: ChangeDetectorRef) {}

   public hasIcon(option: StHeaderModel): boolean {
      return option.icon !== undefined;
   }

   public launchChangeDetector(): void {
      this._cd.markForCheck();
   }

   public onPositionChange(newPosition: number): void {
      this.positionChange.emit(newPosition);
   }

   public isActive(option: StHeaderModel): string {
      if (!option.isActive) {
         return 'sth-header-disable-option';
      } else {
         return '';
      }
   }
}
