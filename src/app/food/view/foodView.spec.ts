import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodView } from './foodView';

describe('FoodView', () => {
  let component: FoodView;
  let fixture: ComponentFixture<FoodView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
