
export interface CommonHourlyWeatherDataResponse {
  elevation: number;
  generationtime_ms: number;
  hourly: CommonHourlyWeatherData;
  hourly_units: CommonHourlyWeatherUnits;
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
}

export interface CommonHourlyWeatherData {
  relative_humidity_2m: number[];
  surface_pressure: number[];
  temperature_2m: number[];
  time: string[];
  wind_speed_10m: number[];
}

export interface CommonHourlyWeatherUnits {
  time: string;
  temperature_2m: string;
  surface_pressure: string;
  wind_speed_10m: string;
  relative_humidity_2m: number;
}

export interface LocationData {
  latitude: string;
  longitude: string;
}
