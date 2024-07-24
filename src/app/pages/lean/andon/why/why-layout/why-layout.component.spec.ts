import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyLayoutComponent } from './why-layout.component';

describe('WhyLayoutComponent', () => {
  let component: WhyLayoutComponent;
  let fixture: ComponentFixture<WhyLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhyLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhyLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
