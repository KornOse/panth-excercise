import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysRangeInputComponent } from './days-range-input.component';

describe('DaysRangeInputComponent', () => {
  let component: DaysRangeInputComponent;
  let fixture: ComponentFixture<DaysRangeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DaysRangeInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DaysRangeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
