import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step8editComponent } from './step8edit.component';

describe('Step8editComponent', () => {
  let component: Step8editComponent;
  let fixture: ComponentFixture<Step8editComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Step8editComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step8editComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
