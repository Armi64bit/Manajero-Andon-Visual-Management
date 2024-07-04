import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseMethodComponent } from './use-method.component';

describe('UseMethodComponent', () => {
  let component: UseMethodComponent;
  let fixture: ComponentFixture<UseMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseMethodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UseMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
