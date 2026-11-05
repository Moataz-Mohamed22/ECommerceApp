
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ShopService } from './shop.service';
import { IPagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/product';
import { ICategory } from '../shared/models/category';
import { ShopItemComponent } from './shop-item/shop-item.component';
import { ProductParam } from '../shared/models/productParam';
import { PaginationComponent } from '../shared/components/pagination/pagination.component';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    ShopItemComponent,
    PaginationComponent,
    FormsModule
  ],
  styleUrl: './shop.component.scss',
  templateUrl: './shop.component.html',
})
export class ShopComponent implements OnInit {

  constructor(private _service: ShopService) {}

  // Pagination Parameters
  productParam: ProductParam = new ProductParam();

  // Signals
  products = signal<IProduct[]>([]);
  categories = signal<ICategory[]>([]);
  totalItems = signal<number>(0);
  isLoading = signal<boolean>(false);

  // Filters
  CategoryId: number | null = null;
  searchTerm = '';

  // Sorting Options
  SortingOption = [
    { name: 'Name', value: 'Name' },
    { name: 'Price: Low to High', value: 'PriceAsc' },
    { name: 'Price: High to Low', value: 'PriceDesc' },
  ];

  ngOnInit(): void {
    this.getAllProduct();
    this.getAllCategory();
  }

  // Load Products
  getAllProduct(): void {

    this.isLoading.set(true);

    this._service.getProducts(
      this.CategoryId ?? undefined,
      this.productParam.pageNumber,
      this.productParam.pageSize,
      this.productParam.Sort
    ).subscribe({

      next: (value: IPagination) => {

        this.products.set(value.data ?? []);
        this.totalItems.set(value.totalCount ?? 0);

        this.isLoading.set(false);

        console.log('Products:', this.products());
        console.log('Total Items:', this.totalItems());

      },

      error: (error) => {

        console.error('Error loading products:', error);

        this.isLoading.set(false);

      }

    });
  }

  // Load Categories
  getAllCategory(): void {

    this._service.getCategories().subscribe({

      next: (value: ICategory[]) => {

        this.categories.set(value ?? []);

      },

      error: (error) => {

        console.error('Error loading categories:', error);

      }

    });

  }

  // Filter By Category
  selectedCategoryId(categoryId: number | null): void {

    this.CategoryId = categoryId;

    this.productParam.pageNumber = 1;

    this.getAllProduct();

  }

  // Sorting
  onSortChange(event: Event): void {

    const selectedValue =
      (event.target as HTMLSelectElement).value;

    this.productParam.Sort = selectedValue;

    this.productParam.pageNumber = 1;

    this.getAllProduct();

  }

  // Pagination
  onPageChanged(event: PageChangedEvent): void {

    this.productParam.pageNumber = event.page;

    this.productParam.pageSize = event.itemsPerPage;

    this.getAllProduct();

  }

  // Search
  onSearch(event: Event): void {

    this.searchTerm =
      (event.target as HTMLInputElement).value;

  }

  // Filter Products Locally
  get filteredProducts(): IProduct[] {

    const term = this.searchTerm.trim().toLowerCase();

    const allProducts = this.products();

    if (!term) {
      return allProducts;
    }

    return allProducts.filter(product =>

      (product.name ?? '').toLowerCase().includes(term) ||

      (product.description ?? '').toLowerCase().includes(term) ||

      (product.categoryName ?? '').toLowerCase().includes(term)

    );

  }

}
