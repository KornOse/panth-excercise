import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MyTabMenuItem } from '../models';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tab-menu-item',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './tab-menu-item.component.html',
  styleUrl: './tab-menu-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabMenuItemComponent {

  @Input() item: MyTabMenuItem | null = null;

}
