
export function calcHeatIndex(temp: number, humid: number): number {
  return -42.379 + 2.04901523 * temp + 10.14333127 * humid - 0.22475541 * temp * humid - 6.83783e-3 * temp * temp - 5.481717e-2 * humid * humid + 1.22874e-3 * temp * temp * humid + 8.5282e-4 * temp * humid * humid - 1.99e-6 * temp * temp * humid * humid;
}

export function fahToCelsius(temp: number): number {
  return (temp - 32) * (5 / 9);
}

export function celsiusToFah(temp: number): number {
  return (temp * (9 / 5)) + 32;
}
