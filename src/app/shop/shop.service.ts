
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IProduct } from '../shared/models/product';
import { IPagination } from '../shared/models/pagination';
import { ICategory } from '../shared/models/category';

@Injectable({
  providedIn: 'root',
})
export class ShopService {

  constructor(private http: HttpClient) {}

  baseURL = 'https://localhost:44367/api/';

  getCategories() {

    return this.http.get<ICategory[]>(
      this.baseURL + 'Categories/get-all'
    );

  }

  getProducts(
    CategoryId?: number,
    PageNumber: number = 1,
    PageSize: number = 6,
    Sort: string = 'Name'
  ) {

    let params = new HttpParams()
      .set('PageNumber', PageNumber)
      .set('PageSize', PageSize)
      .set('Sort', Sort);

    if (CategoryId != null) {

      params = params.set('CategoryId', CategoryId);

    }

    return this.http.get<IPagination>(
      this.baseURL + 'Product/get-all',
      { params }
    );

  }

  getDetails(id: number) {

    return this.http.get<IProduct>(
      this.baseURL + 'Product/get-by-id/' + id
    );

  }

}
