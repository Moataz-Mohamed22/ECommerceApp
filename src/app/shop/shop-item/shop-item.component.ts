import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IProduct } from '../../shared/models/product';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-shop-item',
  styleUrl: './shop-item.component.scss',
  templateUrl: './shop-item.component.html',
})
export class ShopItemComponent implements OnChanges {
  @Input({ required: true }) product!: IProduct;

  selectedImage = '';
Localhost:string = 'https://localhost:44367/';
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product']) {
      this.selectedImage = this.product?.photos?.[0]?.imageName ?? '';
    }
  }

  selectImage(imageName: string): void {
    this.selectedImage = imageName;
  }
}
