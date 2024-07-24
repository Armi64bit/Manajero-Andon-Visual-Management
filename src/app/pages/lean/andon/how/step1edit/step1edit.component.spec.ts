import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step1editComponent } from './step1edit.component';

describe('Step1editComponent', () => {
  let component: Step1editComponent;
  let fixture: ComponentFixture<Step1editComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Step1editComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step1editComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
