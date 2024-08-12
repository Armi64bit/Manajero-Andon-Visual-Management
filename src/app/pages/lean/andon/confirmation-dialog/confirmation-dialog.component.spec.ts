import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

// Create a mock NbDialogRef
class NbDialogRefMock {
  close(value?: any): void {}
}

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;
  let dialogRef: NbDialogRefMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationDialogComponent ],
      providers: [
        { provide: NbDialogRef, useClass: NbDialogRefMock }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignore unknown elements and attributes
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(NbDialogRef) as unknown as NbDialogRefMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title and message', () => {
    component.title = 'Test Title';
    component.message = 'Test Message';
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('nb-card-header')).nativeElement;
    const messageElement = fixture.debugElement.query(By.css('nb-card-body div')).nativeElement;

    expect(titleElement.textContent).toContain('Test Title');
    expect(messageElement.textContent).toContain('Test Message');
  });

  it('should show checkmark and "Saved!" text after confirm is called', fakeAsync(() => {
    component.confirm();
    fixture.detectChanges();

    // Simulate the passage of time
    tick(1500);
    fixture.detectChanges();

    const checkmarkElement = fixture.debugElement.query(By.css('.checkmark')).nativeElement;
    const checkmarkTextElement = fixture.debugElement.query(By.css('.checkmark-text')).nativeElement;

    expect(checkmarkElement).toBeTruthy();
    expect(checkmarkTextElement.textContent).toContain('Saved!');
  }));

  it('should close dialog with true value when confirm is called', fakeAsync(() => {
    spyOn(dialogRef, 'close');
    component.confirm();

    // Simulate the passage of time
    tick(1500);

    expect(dialogRef.close).toHaveBeenCalledWith(true);
  }));

  it('should close dialog with false value when cancel is called', () => {
    spyOn(dialogRef, 'close');
    component.cancel();
    expect(dialogRef.close).toHaveBeenCalledWith(false);
  });
});
