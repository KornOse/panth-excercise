import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyTabMenuItem, TabMenuComponent } from '../../shared';
import { WeatherDataService } from './services';

@Component({
  selector: 'app-weather-main',
  standalone: true,
  imports: [
    RouterOutlet,
    TabMenuComponent
  ],
  templateUrl: './weather-main.component.html',
  styleUrl: './weather-main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherMainComponent implements OnInit, OnDestroy {

  items = signal<MyTabMenuItem[]>([]);

  constructor(
    private data: WeatherDataService
  ) { }

  ngOnInit(): void {
    this.setMenuItems();
  }

  ngOnDestroy() {
    this.data.destroy();
  }

  setMenuItems() {
    this.items.set([
      { label: 'Table', icon: 'pi pi-table', route: '' },
      {
        label: 'Chart',
        icon: 'pi pi-chart-line',
        route: '/chart'
      },
      { label: 'Calculator', icon: 'pi pi-calculator', route: '/calculator' }
    ]);
  }

}
