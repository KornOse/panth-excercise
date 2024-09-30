import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EP_LIST, getEndpointPath } from '../../endpoints';
import { Observable } from 'rxjs';
import { CommonHourlyWeatherDataResponse } from '../models';
import { LOCATIONS_DATA } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class WeatherRequestsService {

  constructor(
    private http: HttpClient
  ) { }

  // function that fetches weather data from the server
  getCommonHourlyWeatherData(pastDays = 7, forecastDays = 2, location = LOCATIONS_DATA.LONDON): Observable<CommonHourlyWeatherDataResponse> {
    return this.http.get<CommonHourlyWeatherDataResponse>(
      getEndpointPath(EP_LIST.WEATHER.FORECAST),
      {
        params: {
          latitude: location.latitude,
          longitude: location.longitude,
          forecast_days: forecastDays,
          past_days: pastDays,
          hourly: ['temperature_2m', 'relative_humidity_2m', 'surface_pressure', 'wind_speed_10m'],
        }
      }
    );
  }

}
