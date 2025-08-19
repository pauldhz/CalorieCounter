import { TestBed } from '@angular/core/testing';

import { FoodCalculator } from './food-calculator';

describe('FoodCalculator', () => {
  let service: FoodCalculator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodCalculator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
