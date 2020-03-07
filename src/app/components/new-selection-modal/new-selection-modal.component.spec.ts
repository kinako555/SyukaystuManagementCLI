import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSelectionModalComponent } from './new-selection-modal.component';

describe('NewSelectionModalComponent', () => {
  let component: NewSelectionModalComponent;
  let fixture: ComponentFixture<NewSelectionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSelectionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSelectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
