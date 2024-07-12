import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step4editComponent } from './step4edit.component';

describe('Step4editComponent', () => {
  let component: Step4editComponent;
  let fixture: ComponentFixture<Step4editComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Step4editComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step4editComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
