import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { WeatherDataService } from '../../services';
import { InfoBlockComponent, InfoBlockData } from '../../../../shared';

@Component({
  selector: 'app-chart-main',
  standalone: true,
  imports: [
    ChartModule,
    InfoBlockComponent
  ],
  templateUrl: './chart-main.component.html',
  styleUrl: './chart-main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartMainComponent {

  infoData: InfoBlockData = {
    title: 'Weather Chart',
    desc: 'Line chart displaying relationship between the time (x-axis) and the temperature (y-axis) from the table in the first tab.'
  };

  chartData = computed<any>(() => {
    const data = this.weatherData.weatherData();
    return {
      labels: data?.time || [],
      datasets: [
        {
          label: 'Temperature (°C)',
          data: data?.temperature_2m || [],
          fill: true,
          borderColor: 'black',
          pointStyle: false,
          tension: 0.1
        },
      ]
    }
  });

  options: any;

  constructor(
    private weatherData: WeatherDataService
  ) { }

  ngOnInit() {
    if (!this.weatherData.weatherData()) {
      this.weatherData.setWeatherData();
    }
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary,
            callback: function (value: string) {
              return value + '°C';
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

}
