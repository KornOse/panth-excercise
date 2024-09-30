import { Injectable, signal } from '@angular/core';
import { CommonHourlyWeatherData, CommonHourlyWeatherDataResponse, CommonHourlyWeatherUnits, WeatherRequestsService } from '../../../requests';
import { map } from 'rxjs';
import { WeatherHourlyItem } from '../models';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  weatherData = signal<CommonHourlyWeatherData | null>(null);
  weatherDataUnits = signal<CommonHourlyWeatherUnits | null>(null);

  dataDateRange = 7;

  constructor(
    private data: WeatherRequestsService,
    private date: DatePipe
  ) { }

  setWeatherData(days = 7) {
    this.data.getCommonHourlyWeatherData(days)
      // mapping response data to more convenient format
      .pipe(map((data: CommonHourlyWeatherDataResponse) => {
        return {
          data: {
            ...data.hourly,
            time: data.hourly.time.map((time) => this.date.transform(time, 'short') ?? '')
          },
          units: data.hourly_units
        };
      }))
    .subscribe({
      next: (res) => {
        this.weatherData.set(res.data);
        this.weatherDataUnits.set(res.units);
      }
    });
  }

  destroy() {
    this.weatherData.set(null);
    this.weatherDataUnits.set(null);
  }

}
