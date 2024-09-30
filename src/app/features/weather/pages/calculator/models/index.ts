
export interface CalculatorUnitsItem {
  name: string;
  key: TemperatureUnits;
  shortName: string;
  min: number;
}

export enum TemperatureUnits {
  CELSIUS = 'celsius',
  FAHRENHEIT = 'fahrenheit',
}
