import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MacrosDisplay } from './macros-display.component';

describe('MacroValues', () => {
  let component: MacrosDisplay;
  let fixture: ComponentFixture<MacrosDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MacrosDisplay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MacrosDisplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
