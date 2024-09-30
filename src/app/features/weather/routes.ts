import { Route } from "@angular/router";
import { TableMainComponent } from "./pages";
import { ChartMainComponent } from "./pages/chart";
import { CalculatorMainComponent } from "./pages/calculator";

export const WEATHER_ROUTES: Route[] = [
  { path: '', component: TableMainComponent },
  { path: 'chart', component: ChartMainComponent },
  { path: 'calculator', component: CalculatorMainComponent },
];
