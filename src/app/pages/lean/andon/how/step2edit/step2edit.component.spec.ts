import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step2editComponent } from './step2edit.component';

describe('Step2editComponent', () => {
  let component: Step2editComponent;
  let fixture: ComponentFixture<Step2editComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Step2editComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step2editComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
