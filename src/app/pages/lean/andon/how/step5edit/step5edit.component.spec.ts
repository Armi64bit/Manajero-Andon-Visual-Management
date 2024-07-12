import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step5editComponent } from './step5edit.component';

describe('Step5editComponent', () => {
  let component: Step5editComponent;
  let fixture: ComponentFixture<Step5editComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Step5editComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step5editComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
