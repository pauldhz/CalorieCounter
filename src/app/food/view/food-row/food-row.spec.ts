import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodRow } from './food-row';

describe('FoodRow', () => {
  let component: FoodRow;
  let fixture: ComponentFixture<FoodRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodRow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodRow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
