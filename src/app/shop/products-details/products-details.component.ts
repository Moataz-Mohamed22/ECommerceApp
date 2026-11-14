
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { NgxSpinnerComponent } from 'ngx-spinner';

import { ShopService } from '../shop.service';
import { IProduct } from '../../shared/models/product';
import { NotificationsService } from '../../core/services/notifications.service';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-products-details',
  standalone: true,
  imports: [CurrencyPipe, DecimalPipe, NgxSpinnerComponent],
  styleUrl: './products-details.component.scss',
  templateUrl: './products-details.component.html',
})
export class ProductsDetailsComponent implements OnInit {

  constructor(
    private shopService: ShopService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  private notification = inject(NotificationsService);

  // Signals
  product = signal<IProduct | null>(null);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  selectedImage = signal<string | null>(null);
  quantity = signal(1);

  host = 'https://localhost:44367/';

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));

      if (!Number.isInteger(id) || id <= 0) {
        this.errorMessage.set('Invalid product ID');
        return;
      }

      this.loadProduct(id);
    });
  }

  loadProduct(id: number): void {
    this.isLoading.set(true);
    this.product.set(null);
    this.errorMessage.set(null);

    this.shopService.getDetails(id).subscribe({
      next: product => {
        this.product.set(product);

        // Set default selected image
        if (product.photos?.length) {
          this.selectedImage.set(product.photos[0].imageName);
        }

        this.isLoading.set(false);
      },

      error: error => {
        console.error('Error loading product:', error);
        this.errorMessage.set('Failed to load product details');
        this.isLoading.set(false);
      }
    });
  }

  selectImage(imageName: string): void {
    this.selectedImage.set(imageName);
  }

  increaseQuantity(): void {
    this.quantity.update(value => value + 1);
  }

  decreaseQuantity(): void {
    this.quantity.update(value => Math.max(1, value - 1));
  }

  addToCart(): void {

    const currentProduct = this.product();

    if (!currentProduct) {
      this.notification.showError('Product is not available');
      return;
    }

    this.cartService.addItemToCart(
      currentProduct,
      this.quantity()
    );

    this.notification.showSuccess('Product added successfully!');
  }
}
