import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InputRowLabelData, InputRowSubText } from './models';

@Component({
  selector: 'app-input-row',
  standalone: true,
  imports: [],
  templateUrl: './input-row.component.html',
  styleUrl: './input-row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputRowComponent {

  @Input() labelData: InputRowLabelData | undefined;
  @Input() subTextList: InputRowSubText[] = [];

}
