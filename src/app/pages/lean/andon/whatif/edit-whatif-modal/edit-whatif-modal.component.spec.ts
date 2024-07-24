import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWhatifModalComponent } from './edit-whatif-modal.component';

describe('EditWhatifModalComponent', () => {
  let component: EditWhatifModalComponent;
  let fixture: ComponentFixture<EditWhatifModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWhatifModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditWhatifModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
