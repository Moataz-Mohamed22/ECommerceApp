import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loadingInterceptor } from './core/Interceptor/loading.interceptor';
import { provideHotToastConfig } from '@ngxpert/hot-toast';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(),
    provideZonelessChangeDetection(),
    provideHttpClient(withInterceptors([loadingInterceptor])),
     provideHotToastConfig({
      theme: 'glassmorphism',
      position: 'top-right',
      duration: 3500,
      dismissible: true,
      reverseOrder: true,
      visibleToasts: 4,
      stacking: 'vertical'
    })
  ],
};
