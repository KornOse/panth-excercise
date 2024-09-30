import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InputNumberModule } from 'primeng/inputnumber';
import { SliderModule } from 'primeng/slider';
import { InputRowComponent, InputRowData } from '../../../../../../shared';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-days-range-input',
  standalone: true,
  imports: [
    SliderModule,
    InputNumberModule,
    InputRowComponent,
    ReactiveFormsModule
  ],
  templateUrl: './days-range-input.component.html',
  styleUrl: './days-range-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DaysRangeInputComponent {

  @Input() displayValue = 7;
  @Input() rangeFc: FormControl | null = null;
  @Input() inputRowData: InputRowData | null = null;
  @Input() sliderMin = 0;
  @Input() sliderMax = 92;


}
