import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSelectionsComponent } from './search-selections.component';

describe('SearchSelectionsComponent', () => {
  let component: SearchSelectionsComponent;
  let fixture: ComponentFixture<SearchSelectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchSelectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSelectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
