import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step10editComponent } from './step10edit.component';

describe('Step10editComponent', () => {
  let component: Step10editComponent;
  let fixture: ComponentFixture<Step10editComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Step10editComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step10editComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
