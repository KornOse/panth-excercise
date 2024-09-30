import { Injectable } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class PrimeConfigService {

  constructor(
    private primengConfig: PrimeNGConfig
  ) { }

  init() {
    this.primengConfig.ripple = true;
  }
}
