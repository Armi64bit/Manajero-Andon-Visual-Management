import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatifLayoutComponent } from './whatif-layout.component';

describe('WhatifLayoutComponent', () => {
  let component: WhatifLayoutComponent;
  let fixture: ComponentFixture<WhatifLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatifLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatifLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
