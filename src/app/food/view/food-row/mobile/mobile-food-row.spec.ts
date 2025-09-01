import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileFoodRow } from './mobile-food-row';

describe('MobileFoodRow', () => {
  let component: MobileFoodRow;
  let fixture: ComponentFixture<MobileFoodRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileFoodRow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileFoodRow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
