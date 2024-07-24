import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent  implements OnInit,OnDestroy{
  isMobile: boolean;

  constructor() {
    // Initialize isMobile based on initial viewport width
    this.isMobile = window.innerWidth < 600; // Adjust the width threshold as needed
  }

  ngOnInit(): void {
    // Listen to window resize events
    window.addEventListener('resize', this.checkScreenSize);
    // Initial check once component is initialized
    this.checkScreenSize();
  }

  ngOnDestroy(): void {
    // Clean up the event listener when component is destroyed
    window.removeEventListener('resize', this.checkScreenSize);
  }

  @HostListener('window:resize', ['$event'])
  checkScreenSize(): void {
    // Update isMobile based on current viewport width
    this.isMobile = window.innerWidth < 600; // Adjust the width threshold as needed
  }
}
