import { TestBed } from '@angular/core/testing';

import { FoodGateway } from './food-gateway';

describe('FoodGateway', () => {
  let service: FoodGateway;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodGateway);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
