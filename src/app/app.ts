import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@Component({
  imports: [RouterOutlet, NavBarComponent,PaginationModule],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App  {



  protected readonly title = signal('E-commerce App');


}
