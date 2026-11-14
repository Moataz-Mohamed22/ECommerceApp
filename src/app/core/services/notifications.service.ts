import { Injectable, inject } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';
import { title } from 'process';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private toast = inject(HotToastService);

  private options = {
    position: 'top-right' as const,
    duration: 3500,
    dismissible: true,
    theme: 'glassmorphism' as const,
    style: {
      background: 'rgba(28, 28, 28, 0.90)',
      color: '#FFFFFF',
      border: '1px solid rgba(255,255,255,0.15)',
      borderRadius: '14px',
      padding: '16px 20px',
      backdropFilter: 'blur(15px)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
      fontSize: '14px',
      fontWeight: '500'
    }
  };

  showSuccess(message: string) {
    this.toast.success(message, {
      ...this.options,
      iconTheme: {
        primary: '#4EA674',
        secondary: '#FFFFFF'
      }
    });
  }

  showError(message: string ,content?: string) {
    this.toast.error(message,  {
      ...this.options,
      iconTheme: {
        primary: '#DC6262',
        secondary: '#FFFFFF'
      }
    });
  }

  showWarning(message: string) {
    this.toast.warning(message, {
      ...this.options,
      iconTheme: {
        primary: '#D9A441',
        secondary: '#FFFFFF'
      }
    });
  }

  showInfo(message: string) {
    this.toast.info(message, {
      ...this.options,
      iconTheme: {
        primary: '#60A5FA',
        secondary: '#FFFFFF'
      }
    });
  }
}
