import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductFake } from 'src/app/models/FakeApi';
import { ProductRes } from 'src/app/models/Product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // private http = inject(HttpClient);

  public fakeUrl: string = 'https://fakestoreapi.com/products';

  private uri: string = 'api';
  private flag: string = 'product'

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<ProductRes[]> {
    return this.http.get<ProductRes[]>(`${environment.API_URL}/${this.uri}/${this.flag}`);
  }

  getProductId(product_id: number): Observable<ProductRes> {
    return this.http.get<ProductRes>(`${environment.API_URL}/${this.uri}/${this.flag}/${product_id}`);
  }

  getAllProductsFake() {
    return this.http.get<ProductFake[]>(`${this.fakeUrl}`);
  }

  getProductIdFake(product_id: number): Observable<ProductFake> {
    return this.http.get<ProductFake>(`${this.fakeUrl}/${product_id}`);
  }
}
