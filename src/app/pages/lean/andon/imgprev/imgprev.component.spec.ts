import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgprevComponent } from './imgprev.component';

describe('ImgprevComponent', () => {
  let component: ImgprevComponent;
  let fixture: ComponentFixture<ImgprevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgprevComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgprevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
