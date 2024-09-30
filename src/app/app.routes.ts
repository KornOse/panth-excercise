import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features').then(mod => mod.WeatherMainComponent),
    loadChildren: () => import('./features').then(mod => mod.WEATHER_ROUTES)
  },
];
