import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InfoBlockData } from './models';

@Component({
  selector: 'app-info-block',
  standalone: true,
  imports: [],
  templateUrl: './info-block.component.html',
  styleUrl: './info-block.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoBlockComponent {

  @Input() data: InfoBlockData | null = null;

}
