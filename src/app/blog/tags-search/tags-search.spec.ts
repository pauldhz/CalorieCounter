import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsSearch } from './tags-search';

describe('TagsSearch', () => {
  let component: TagsSearch;
  let fixture: ComponentFixture<TagsSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagsSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagsSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
