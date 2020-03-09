import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSelectionComponent } from './new-selection.component';

describe('NewSelectionComponent', () => {
  let component: NewSelectionComponent;
  let fixture: ComponentFixture<NewSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
