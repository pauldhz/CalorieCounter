import { TestBed } from '@angular/core/testing';

import { FoodPreviewService } from './food-preview.service';

describe('FoodPreview', () => {
  let service: FoodPreviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodPreviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
