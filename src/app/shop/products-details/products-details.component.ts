import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ShopService } from '../shop.service';
import { IProduct } from '../../shared/models/product';
import { CurrencyPipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-products-details',
  standalone: true,
  imports: [CurrencyPipe, DecimalPipe],
  styleUrl: './products-details.component.scss',
  templateUrl: './products-details.component.html',
})
export class ProductsDetailsComponent implements OnInit {
  constructor(
    private shopService: ShopService,
    private route: ActivatedRoute,
  ) {}

  // Signals
  product = signal<IProduct | null>(null);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
selectedImage = signal<string | null>(null);

quantity = signal(1);

selectImage(imageName: string): void {
  this.selectedImage.set(imageName);
}

increaseQuantity(): void {
  this.quantity.update(value => value + 1);
}

decreaseQuantity(): void {
  this.quantity.update(value => Math.max(1, value - 1));
}

ngOnInit(): void {
  this.route.paramMap.subscribe((params) => {
    const id = Number(params.get('id'));

      if (!id || isNaN(id)) {
        this.errorMessage.set('Invalid product ID');
        return;
      }

      this.loadProduct(id);
    });
  }
host:string = 'https://localhost:44367/';
  loadProduct(id: number): void {
    this.isLoading.set(true);
    this.product.set(null);
    this.errorMessage.set(null);

    this.shopService.getDetails(id).subscribe({
      next: (product) => {
        this.product.set(product);
        this.isLoading.set(false);
      },

      error: (error) => {
        console.error('Error loading product:', error);
        this.errorMessage.set('Failed to load product details');
        this.isLoading.set(false);
      },
    });
  }
}
