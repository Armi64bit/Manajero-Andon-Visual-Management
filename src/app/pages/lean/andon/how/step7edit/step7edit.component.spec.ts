import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step7editComponent } from './step7edit.component';

describe('Step7editComponent', () => {
  let component: Step7editComponent;
  let fixture: ComponentFixture<Step7editComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Step7editComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step7editComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
