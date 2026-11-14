
import { Component, inject } from '@angular/core';
import {
  Router,
  RouterOutlet,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';

import { NgxSpinnerModule } from 'ngx-spinner';
import { filter } from 'rxjs';
import { LoadingService } from './core/services/loading.service';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NgxSpinnerModule,
    NavBarComponent
],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  private router = inject(Router);
  private loadingService = inject(LoadingService);

  constructor() {

    this.router.events.pipe(
      filter(event =>
        event instanceof NavigationStart ||
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      )
    ).subscribe(event => {

      if (event instanceof NavigationStart) {
        this.loadingService.show();
      }

      else {
        this.loadingService.hide();
      }

    });

  }
}
