import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodListHeader } from './food-list-header';

describe('FoodListHeader', () => {
  let component: FoodListHeader;
  let fixture: ComponentFixture<FoodListHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodListHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodListHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
