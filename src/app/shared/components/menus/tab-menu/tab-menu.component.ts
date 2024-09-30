import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TabMenuModule } from 'primeng/tabmenu';
import { MyTabMenuItem } from '../models';
import { TabMenuItemComponent } from '../tab-menu-item/tab-menu-item.component';

@Component({
  selector: 'app-tab-menu',
  standalone: true,
  imports: [
    TabMenuModule,
    TabMenuItemComponent
  ],
  templateUrl: './tab-menu.component.html',
  styleUrl: './tab-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabMenuComponent {

  @Input({ required: true }) items: MyTabMenuItem[] = [];

}
