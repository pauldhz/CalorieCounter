import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodViewPreview } from './food-view-preview';

describe('FoodPreview', () => {
  let component: FoodViewPreview;
  let fixture: ComponentFixture<FoodViewPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodViewPreview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodViewPreview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
