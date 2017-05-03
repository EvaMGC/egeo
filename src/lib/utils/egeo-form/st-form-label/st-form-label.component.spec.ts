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
      let rootElement: HTMLElement = fixture.nativeElement.querySelector('.st-form-label-title');

      expect(rootElement.classList).toContain('sth-form-label');
   });

   describe('it should add a class according its status', () => {
      it('if status is disabled, disabled class is added to the root element', () => {
         component.status = StFormLabelStatus.DISABLED;
         fixture.detectChanges();
         fixture.changeDetectorRef.markForCheck();
         let rootElement: HTMLElement = fixture.nativeElement.querySelector('.st-form-label-title');

         expect(rootElement.classList).toContain('disabled');
      });

      it('if status is focus, active class is added to the root element', () => {
         component.status = StFormLabelStatus.FOCUS;
         fixture.detectChanges();
         fixture.changeDetectorRef.markForCheck();
         let rootElement: HTMLElement = fixture.nativeElement.querySelector('.st-form-label-title');

         expect(rootElement.classList).toContain('active');
      });

      it('if status is error, error class is added to the root element', () => {
         component.status = StFormLabelStatus.ERROR;
         fixture.detectChanges();
         fixture.changeDetectorRef.markForCheck();
         let rootElement: HTMLElement = fixture.nativeElement.querySelector('.st-form-label-title');

         expect(rootElement.classList).toContain('error');
      });
   });

});

