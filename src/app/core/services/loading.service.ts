
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private activeRequests = 0;

  constructor(private spinner: NgxSpinnerService) {}

  show(): void {
    this.activeRequests++;

    if (this.activeRequests === 1) {
      this.spinner.show('globalSpinner');
    }
  }

  hide(): void {
    if (this.activeRequests === 0) {
      return;
    }

    this.activeRequests--;

    if (this.activeRequests === 0) {
      this.spinner.hide('globalSpinner');
    }
  }

  getActiveCount(): number {
    return this.activeRequests;
  }
}
