import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabMenuItemComponent } from './tab-menu-item.component';

describe('TabMenuItemComponent', () => {
  let component: TabMenuItemComponent;
  let fixture: ComponentFixture<TabMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabMenuItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
