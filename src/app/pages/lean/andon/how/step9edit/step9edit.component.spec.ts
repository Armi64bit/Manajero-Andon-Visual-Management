import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step9editComponent } from './step9edit.component';

describe('Step9editComponent', () => {
  let component: Step9editComponent;
  let fixture: ComponentFixture<Step9editComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Step9editComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step9editComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
