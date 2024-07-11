import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWhyModalComponent } from './edit-why-modal.component';

describe('EditWhyModalComponent', () => {
  let component: EditWhyModalComponent;
  let fixture: ComponentFixture<EditWhyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWhyModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditWhyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
