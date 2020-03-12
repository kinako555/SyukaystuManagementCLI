import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSelectionModalComponent } from './edit-selection-modal.component';

describe('EditSelectionModalComponent', () => {
  let component: EditSelectionModalComponent;
  let fixture: ComponentFixture<EditSelectionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSelectionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSelectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
