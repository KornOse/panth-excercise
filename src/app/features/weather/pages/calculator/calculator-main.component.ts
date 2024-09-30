import { ChangeDetectionStrategy, Component, computed, OnDestroy, OnInit, signal } from '@angular/core';
import { CalculatorStateService } from './services';
import { DropdownModule } from 'primeng/dropdown';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalculatorUnitsItem, TemperatureUnits } from './models';
import { InputNumberModule } from 'primeng/inputnumber';
import { calcHeatIndex, celsiusToFah, fahToCelsius, UnsubscribeController } from '../../../../core';
import { debounceTime, takeUntil } from 'rxjs';
import { HeatDangerIndicatorDirective, InfoBlockComponent, InfoBlockData, InputRowComponent } from '../../../../shared';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-calculator-main',
  standalone: true,
  imports: [
    DropdownModule,
    ReactiveFormsModule,
    InputNumberModule,
    InputRowComponent,
    DecimalPipe,
    HeatDangerIndicatorDirective,
    InfoBlockComponent
  ],
  templateUrl: './calculator-main.component.html',
  styleUrl: './calculator-main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculatorMainComponent implements OnInit, OnDestroy {

  get state() {
    return this.stateService;
  }

  constructor(
    private stateService: CalculatorStateService
  ) { }

  ngOnInit(): void {
    this.state.init();
  }

  ngOnDestroy() {
    this.state.destroy();
  }

}
