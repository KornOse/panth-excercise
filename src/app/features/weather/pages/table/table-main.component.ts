import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, OnDestroy, OnInit, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { FormControl } from '@angular/forms';

import { WeatherDataService } from '../../services';
import { WeatherHourlyItem } from '../../models';
import { WeatherTableColumn } from './models';
import { CommonHourlyWeatherData } from '../../../../requests';
import { debounceTime, takeUntil } from 'rxjs';
import { InfoBlockComponent, InfoBlockData, InputRowData } from '../../../../shared';
import { UnsubscribeController } from '../../../../core';
import { DaysRangeInputComponent } from './components';

@Component({
  selector: 'app-table-main',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    InfoBlockComponent,
    DaysRangeInputComponent
  ],
  templateUrl: './table-main.component.html',
  styleUrl: './table-main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableMainComponent implements OnInit, OnDestroy {

  dateRangeMax = 92;
  infoData: InfoBlockData = {
    title: 'Weather Data Table',
    desc: 'This table displays weather forecast information for London in various ways, including historical data.'
  };
  inputRowData: InputRowData = {
    labelData: { id: 'pastDays', label: 'Historical date range in days' },
    subTextList: [{ key: 'Max', value: `${this.dateRangeMax} days` }]
  }

  daysValue = 7;
  daysRangeFc = new FormControl(7);

  tableData = computed<WeatherHourlyItem[]>(() => {
    const data = this.weatherData.weatherData();
    if (!data) {
      return [];
    } else {
      // parsing data to desired format for table
      return this.parseHourlyData(data);
    }
  });

  tableColumns = computed<WeatherTableColumn[]>(() => {
    const units = this.weatherData.weatherDataUnits();
    if (units) {
      // setting columns with units
      return [
        { field: 'time', header: 'Datetime' },
        { field: 'temperature_2m', header: `Temperature (${units?.temperature_2m})`, isSortable: true },
        { field: 'surface_pressure', header: `Surface pressure (${units?.surface_pressure})` },
        { field: 'wind_speed_10m', header: `Wind speed (${units?.wind_speed_10m})` },
        { field: 'relative_humidity_2m', header: `Humidity (${units?.relative_humidity_2m})` },
      ];
    } else {
      // fallback columns without units
      return [
        { field: 'time', header: 'Datetime' },
        { field: 'temperature_2m', header: 'Temperature', isSortable: true },
        { field: 'surface_pressure', header: 'Surface pressure' },
        { field: 'wind_speed_10m', header: 'Wind speed' },
        { field: 'relative_humidity_2m', header: 'Humidity' },
      ]
    }
  });

  firstPage = signal<number>(0);

  private unsubscribeController = new UnsubscribeController();

  constructor(
    private weatherData: WeatherDataService
  ) {}

  ngOnInit() {
    this.setListeners();
    this.preselectDays(this.weatherData.dataDateRange);
  }

  ngOnDestroy() {
    this.unsubscribeController.destroy();
  }

  // function that prefills days range from weather data service
  preselectDays(days: number) {
    this.daysRangeFc.setValue(days);
    this.daysValue = days;
  }

  // setting listeners for days range form control
  // debounce time is set to 300ms to prevent unnecessary calculations
  setListeners() {
    this.daysRangeFc.valueChanges.pipe(
      takeUntil(this.unsubscribeController.ngUnsubscribe),
      debounceTime(300)
    ).subscribe((res) => {
      if (res !== null && res !== undefined) {
        // resetting to prevent buggy behaviour
        this.resetPagination();
        this.weatherData.dataDateRange = res;
        // fetching data with new days range
        this.weatherData.setWeatherData(res);
      }
    });
  }

  // function that parses hourly data to desired format for table
  private parseHourlyData(data: CommonHourlyWeatherData): WeatherHourlyItem[] {
    const keys = Object.keys(data) as (keyof CommonHourlyWeatherData)[];
    const length = data[keys[0]].length;

    return Array.from({ length }, (_, index) => {
      const transformedObject: { [key: string]: any } = {};
      keys.forEach(key => {
        transformedObject[key] = data[key][index];
      });
      return transformedObject as WeatherHourlyItem;
    });
  }

  pageChange(event: any) {
    this.firstPage.set(event.first);
  }

  resetPagination() {
    this.firstPage.set(0);
  }

}
