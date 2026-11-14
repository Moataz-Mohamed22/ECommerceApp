
import { Component, afterNextRender, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import { CartService } from '../../cart/cart.service';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [
    RouterLink,
    RouterLinkActive,
    MatBadgeModule,
    MatButtonModule,
    MatIconModule
  ],
  selector: 'app-nav-bar',
  styleUrl: './nav-bar.component.scss',
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent {

  private cartService = inject(CartService);

  // Automatically tracks cart changes
  count = toSignal(
    this.cartService.cart.pipe(
      map(cart =>
        cart?.cartItems.reduce(
          (total, item) => total + item.quantity,
          0
        ) ?? 0
      )
    ),
    { initialValue: 0 }
  );

  constructor() {
    afterNextRender(() => {
      const cartId = localStorage.getItem('cartId');

      if (cartId) {
        this.cartService.getCart(cartId).subscribe({
          error: err => console.error('Error loading cart:', err)
        });
      } else {
        this.cartService.loadCart();
      }
    });
  }
}
