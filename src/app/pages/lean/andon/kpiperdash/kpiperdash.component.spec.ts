import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiperdashComponent } from './kpiperdash.component';

describe('KpiperdashComponent', () => {
  let component: KpiperdashComponent;
  let fixture: ComponentFixture<KpiperdashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KpiperdashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KpiperdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
