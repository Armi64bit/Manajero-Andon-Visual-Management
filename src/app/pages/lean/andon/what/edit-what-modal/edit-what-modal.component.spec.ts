import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWhatModalComponent } from './edit-what-modal.component';

describe('EditWhatModalComponent', () => {
  let component: EditWhatModalComponent;
  let fixture: ComponentFixture<EditWhatModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWhatModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditWhatModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
