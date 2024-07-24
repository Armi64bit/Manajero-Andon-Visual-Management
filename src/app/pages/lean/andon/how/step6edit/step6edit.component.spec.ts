import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step6editComponent } from './step6edit.component';

describe('Step6editComponent', () => {
  let component: Step6editComponent;
  let fixture: ComponentFixture<Step6editComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Step6editComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step6editComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
