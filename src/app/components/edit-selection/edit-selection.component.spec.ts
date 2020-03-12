import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSelectionComponent } from './edit-selection.component';

describe('EditSelectionComponent', () => {
  let component: EditSelectionComponent;
  let fixture: ComponentFixture<EditSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
