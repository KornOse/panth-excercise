import { Injectable, signal } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { takeUntil, debounceTime } from 'rxjs';
import { UnsubscribeController, fahToCelsius, celsiusToFah, calcHeatIndex } from '../../../../../core';
import { InfoBlockData } from '../../../../../shared';
import { CalculatorUnitsItem, TemperatureUnits } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CalculatorStateService {

  infoData: InfoBlockData = {
    title: 'Heat Index Calculator',
    desc: 'This calculator estimates the heat index based on the temperature and relative humidity. The heat index is a measure of how hot it feels when relative humidity is factored in with the actual air temperature.'
  };

  tempUnits: CalculatorUnitsItem[] = [
    { name: 'Celsius', key: TemperatureUnits.CELSIUS, shortName: '°C', min: 26.7 },
    { name: 'Fahrenheit', key: TemperatureUnits.FAHRENHEIT, shortName: '°F', min: 80 },
  ];
  currentUnit = signal<CalculatorUnitsItem>(this.tempUnits[0]);

  formGroup: FormGroup = new FormGroup({
    temperature: new FormControl<number>(0, [Validators.required]),
    relativeHumidity: new FormControl<number>(40, [Validators.required, Validators.min(0), Validators.max(100)]),
    selectedUnit: new FormControl<CalculatorUnitsItem>(this.currentUnit()),
  });

  currentHeatIndex = signal<number | null>(0);
  currentFahHeatIndex = signal<number>(0);

  formInvalid = signal<boolean>(true);

  private unsubscribeController = new UnsubscribeController();

  get temperature() {
    return this.formGroup.get('temperature');
  }
  get selectedUnit() {
    return this.formGroup.get('selectedUnit');
  }
  get relativeHumidity() {
    return this.formGroup.get('relativeHumidity');
  }

  constructor() { }

  init() {
    this.setValueListeners();
    this.updateValidators();
  }

  destroy() {
    this.unsubscribeController.destroy();
    // optional: reset all values to default
    //
    // this.currentUnit.set(this.tempUnits[0]);
    // this.currentHeatIndex.set(0);
    // this.currentFahHeatIndex.set(0);
    // this.formInvalid.set(true);
    // this.temperature?.setValue(0);
    // this.relativeHumidity?.setValue(40);
    // this.selectedUnit?.setValue(this.currentUnit());
  }

  setValueListeners() {
    // listening for temperature unit changes
    this.selectedUnit?.valueChanges
      .pipe(takeUntil(this.unsubscribeController.ngUnsubscribe))
      .subscribe((val: CalculatorUnitsItem) => {
        if (val) {
          this.currentUnit.set(val);
          // update validators because min value is different for each unit
          this.updateValidators();
          // convert temperature value to selected unit
          this.convertTemp();
        }
      });

    // listening for temperature or humidity changes
    // debounce time is set to 300ms to prevent unnecessary calculations
    this.formGroup.valueChanges
      .pipe(
        takeUntil(this.unsubscribeController.ngUnsubscribe),
        debounceTime(300)
      )
      .subscribe(() => {
        this.formInvalid.set(this.formGroup.invalid);
        this.updateHeatIndex();
      });
  }

  // function that updates temperature validators based on selected unit
  updateValidators() {
    const unit: CalculatorUnitsItem = this.selectedUnit?.value;

    this.temperature?.setValidators([Validators.required, Validators.min(unit.min)]);
    this.temperature?.updateValueAndValidity();
  }

  // function that converts current temperature value to Fah if Celsius is selected and vice versa
  convertTemp() {
    const temp = this.temperature?.value;

    if (temp) {
      const converted = this.currentUnit().key === TemperatureUnits.CELSIUS ? fahToCelsius(temp) : celsiusToFah(temp);

      this.temperature?.setValue(converted);
    }
  }

  // function that updates heat index value
  updateHeatIndex() {
    // converting all values to Fahrenheit because the formula requires Fahrenheit values
    const temp = this.currentUnit().key === TemperatureUnits.CELSIUS ? celsiusToFah(this.temperature?.value) : this.temperature?.value;
    const humid = this.relativeHumidity?.value;
    const heatIndex = this.currentUnit().key === TemperatureUnits.CELSIUS ? fahToCelsius(calcHeatIndex(temp, humid)) : calcHeatIndex(temp, humid);
    // this is heat index value in Fahrenheit for danger indicator
    const fHeatIndex = this.currentUnit().key === TemperatureUnits.CELSIUS ? celsiusToFah(heatIndex) : heatIndex;

    this.currentFahHeatIndex.set(this.formInvalid() ? 0 : fHeatIndex);
    this.currentHeatIndex.set(heatIndex);
  }

}
