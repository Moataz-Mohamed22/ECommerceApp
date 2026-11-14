import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IProduct } from '../../shared/models/product';
import { RouterLink } from '@angular/router';
import { NotificationsService } from '../../core/services/notifications.service';
import { CartService } from '../../cart/cart.service';

@Component({
  imports: [RouterLink],
  selector: 'app-shop-item',
  styleUrl: './shop-item.component.scss',
  templateUrl: './shop-item.component.html',
})
export class ShopItemComponent implements OnChanges {
  constructor(private _service: CartService) {}
  @Input({ required: true }) product!: IProduct;
  private notification = inject(NotificationsService);

  addToCart(product: IProduct) {
    this.notification.showSuccess('Product added successfully!');
    this.SetCartValue();
  }
  selectedImage = '';
  Localhost: string = 'https://localhost:44367/';
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product']) {
      this.selectedImage = this.product?.photos?.[0]?.imageName ?? '';
    }
  }
  selectImage(imageName: string): void {
    this.selectedImage = imageName;
  }
  //Cart
  SetCartValue() {
    this._service.addItemToCart(this.product);
  }
}
