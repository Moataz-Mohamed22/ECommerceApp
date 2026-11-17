import { Component, computed, OnInit, signal } from '@angular/core';
import { ICart } from '../shared/models/cart';
import { CartService } from './cart.service';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  imports: [RouterLink, CurrencyPipe],
  selector: 'app-cart',
  styleUrl: './cart.component.scss',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  constructor(private _service: CartService) {}
  cart = signal<ICart | null>(null);
  Localhost: string = 'https://localhost:44367/';
  ngOnInit(): void {
    this._service.cart$.subscribe({
      next: (value) => {
        this.cart.set(value);
      },
      error(err) {
        console.log(err);
      },
    });
  }
  totalPrice = computed(
    () =>
      this.cart()?.cartItems.reduce((total, item) => total + item.price * item.quantity, 0) ?? 0,
  );
  removeItem(productId: number): void {
  this._service.removeItem(productId).subscribe({
    next: (updatedCart) => {
      this.cart.set(updatedCart);
    },
    error: (error) => {
      console.error('Failed to remove item:', error);
    }
  });
}
  increaseQuantity(productId: number, currentQuantity: number): void {
  this.updateQuantity(productId, currentQuantity + 1);
}

decreaseQuantity(productId: number, currentQuantity: number): void {
  if (currentQuantity <= 1) return;

  this.updateQuantity(productId, currentQuantity - 1);
}

private updateQuantity(productId: number, quantity: number): void {
  const currentCart = this.cart();

  if (!currentCart || quantity < 1) return;

  const updatedCart = {
    ...currentCart,
    cartItems: currentCart.cartItems.map(item =>
      item.id === productId
        ? { ...item, quantity }
        : item
    )
  };

  this._service.setCart(updatedCart).subscribe({
    next: (savedCart) => {
      this.cart.set(savedCart);
    },
    error: (error) => {
      console.error('Failed to update cart quantity:', error);
    }
  });
}

}
