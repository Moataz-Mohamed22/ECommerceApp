import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, tap } from 'rxjs';

import { Cart, ICart, ICartItem } from '../shared/models/cart';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseURL = 'https://localhost:44367/api/Carts/';

  constructor(private http: HttpClient) {}

  // Holds the current cart state
  private cartSource = new BehaviorSubject<ICart | null>(null);

  cart = this.cartSource.asObservable();

  // Create new cart
  private createCart(): ICart {
    const cart = new Cart();

    localStorage.setItem('cartId', cart.id);

    return cart;
  }

  // Get current cart value
  getCurrentValue(): ICart | null {
    return this.cartSource.value;
  }

  // Load cart when application starts
  loadCart(): void {
    const cartId = localStorage.getItem('cartId');

    if (!cartId) {
      const cart = this.createCart();

      this.setCart(cart).subscribe();

      return;
    }

    this.getCart(cartId).subscribe({
      next: (cart) => {
        if (!cart?.id) {
          const newCart: ICart = {
            id: cartId,
            cartItems: [],
          };

          this.setCart(newCart).subscribe();
        }
      },
      error: (error) => {
        console.error('Error loading cart:', error);
      },
    });
  }

  // Save cart in Redis (Create or Update)
  setCart(cart: ICart): Observable<ICart> {
    return this.http.post<ICart>(`${this.baseURL}update-cart-item/${cart.id}`, cart).pipe(
      tap((savedCart) => {
        this.cartSource.next(savedCart);
        console.log(savedCart);
      }),
    );
  }

  // Get cart from Redis
  getCart(cartId: string): Observable<ICart> {
    return this.http.get<ICart>(`${this.baseURL}get-cart-item/${cartId}`).pipe(
      tap((cart) => {
        this.cartSource.next(cart);
        console.log(cart);

      }),
    );
    
  }

  // Add product to cart
  addItemToCart(product: IProduct, quantity: number = 1): void {
    const currentCart = this.getCurrentValue() ?? this.createCart();

    const itemToAdd = this.MapProductToCartItem(product, quantity);

    const existingItem = currentCart.cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentCart.cartItems.push(itemToAdd);
    }

    this.setCart(currentCart).subscribe({
      error: (error) => {
        console.error('Error adding product to cart:', error);
      },
    });
  }

  // Map Product to CartItem
  private MapProductToCartItem(product: IProduct, quantity: number): ICartItem {
    return {
      id: product.id,
      name: product.name,
      image: product.photos?.[0]?.imageName ?? '',
      category: product.categoryName,
      price: product.price,
      quantity: quantity,
    };
  }
}
