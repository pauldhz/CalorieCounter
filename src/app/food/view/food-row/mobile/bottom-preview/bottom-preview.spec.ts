import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomPreview } from './bottom-preview';

describe('BottomPreview', () => {
  let component: BottomPreview;
  let fixture: ComponentFixture<BottomPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomPreview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottomPreview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
