import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step3editComponent } from './step3edit.component';

describe('Step3editComponent', () => {
  let component: Step3editComponent;
  let fixture: ComponentFixture<Step3editComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Step3editComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step3editComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
