import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { StFormLabelComponent } from './st-form-label.component';
import { StTooltipModule } from '../../../st-tooltip/st-tooltip.module';
import { StFormLabelStatus } from './st-form-label-status.enum';

let component: StFormLabelComponent;
let fixture: ComponentFixture<StFormLabelComponent>;
let input: HTMLInputElement;

describe('StFormLabelComponent', () => {
   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [StTooltipModule],
         declarations: [StFormLabelComponent]
      })
         .compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(StFormLabelComponent);
      input = fixture.nativeElement.querySelector('input');
      component = fixture.componentInstance;
      component.qaTag = 'test qaTag';
   });

   it('if qa tag is not introduced as input, it throws an error', () => {
      component.qaTag = undefined;
      try {
         fixture.detectChanges();
         expect(component.qaTag).toThrow();
      } catch (error) {
         expect(error.message).toContain('st-form-label-component: field qaTag is a required field');
      }
   });

   it('it has to have  sth-form-label class in its root element', () => {
      let rootElement: HTMLElement = fixture.nativeElement.querySelector('label');

      expect(rootElement.classList).toContain('sth-form-label');
   });

   describe('it should add a class according its status', () => {
      it('if status is disabled, disabled class is added to the root element', () => {
         component.status = StFormLabelStatus.DISABLED;
         fixture.detectChanges();
         fixture.changeDetectorRef.markForCheck();
         let rootElement: HTMLElement = fixture.nativeElement.querySelector('label');

         expect(rootElement.classList).toContain('disabled');
      });

      it('if status is focus, active class is added to the root element', () => {
         component.status = StFormLabelStatus.FOCUS;
         fixture.detectChanges();
         fixture.changeDetectorRef.markForCheck();
         let rootElement: HTMLElement = fixture.nativeElement.querySelector('label');

         expect(rootElement.classList).toContain('active');
      });

      it('if status is error, error class is added to the root element', () => {
         component.status = StFormLabelStatus.ERROR;
         fixture.detectChanges();
         fixture.changeDetectorRef.markForCheck();
         let rootElement: HTMLElement = fixture.nativeElement.querySelector('label');

         expect(rootElement.classList).toContain('error');
      });
   });

   describe('label is positioned according to the input labelPosition', () => {

      it('label is placed on top, when labelPosition is "top"', () => {
         component.labelPosition = 'top';
         fixture.detectChanges();
         fixture.changeDetectorRef.markForCheck();
         let label: HTMLElement = fixture.nativeElement.querySelector('.st-form-label__label');

         expect(label.classList).toContain('st-form-label__label--top');
      });

      it('label is placed on the left, when labelPosition is "left"', () => {
         component.labelPosition = 'left';
         fixture.detectChanges();
         fixture.changeDetectorRef.markForCheck();
         let label: HTMLElement = fixture.nativeElement.querySelector('.st-form-label__label');

         expect(label.classList).toContain('st-form-label__label--left');
      });

      it('label is placed on the right, when labelPosition is "right"', () => {
         component.labelPosition = 'right';
         fixture.detectChanges();
         fixture.changeDetectorRef.markForCheck();
         let label: HTMLElement = fixture.nativeElement.querySelector('.st-form-label__label');

         expect(label.classList).toContain('st-form-label__label--right');
      });

   });

   it('When tooltip is clicked, click propagation is stopped', () => {
      spyOn(MouseEvent.prototype, 'stopPropagation');
      spyOn(MouseEvent.prototype, 'preventDefault');

      component.contextualHelp = 'Tooltip text';
      fixture.detectChanges();
      fixture.changeDetectorRef.markForCheck();

      let tooltip: HTMLElement = fixture.nativeElement.querySelector('.st-form-label__tooltip');

      tooltip.click();

      expect(MouseEvent.prototype.stopPropagation).toHaveBeenCalled();
      expect(MouseEvent.prototype.preventDefault).toHaveBeenCalled();
   });
});
