import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatLayoutComponent } from './what-layout.component';

describe('WhatLayoutComponent', () => {
  let component: WhatLayoutComponent;
  let fixture: ComponentFixture<WhatLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
