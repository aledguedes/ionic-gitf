import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRow,
  IonCol,
  IonIcon,
  IonThumbnail,
  IonImg,
  IonCard,
  IonLabel,
  IonText,
  IonMenuButton,
  IonSearchbar, IonButtons, IonBadge, IonSkeletonText
} from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductService } from 'src/app/services/product/product.service';
import { ProductRes } from 'src/app/models/Product';
import { ProductFake } from 'src/app/models/FakeApi';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonSkeletonText, IonBadge, IonButtons,
    IonSearchbar,
    IonText,
    IonLabel,
    IonCard,
    IonImg,
    IonIcon,
    IonCol,
    IonRow,
    IonThumbnail,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    RouterLink,
    IonMenuButton,
  ],
})
export class HomePage implements OnInit, OnDestroy {
  dummyArray: any = new Array(8);

  items: ProductRes[] = [];
  allItems: ProductRes[] = [];

  itemsF: ProductFake[] = [];
  allItemsF: ProductFake[] = [];

  query!: string;

  totalItems = 0;

  cartSub!: Subscription;

  private api = inject(ApiService);
  cartService = inject(CartService);
  private productService = inject(ProductService);

  isLoading: boolean = false;

  constructor() { }

  ngOnInit() {
    this.getItems();

    this.cartSub = this.cartService.cart.subscribe({
      next: (cart) => {
        this.totalItems = cart ? cart?.totalItem : 0;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.cartSub) this.cartSub.unsubscribe();
  }

  getItems() {
    setTimeout(() => {
        this.productService.getAllProductsFake().subscribe({
          next: (data) => {
            this.allItemsF = data;
            this.itemsF = [...this.allItemsF];
            this.isLoading = true;
            console.log('ALL PRODUCTS DATA', data);
          },
          error: (err) => {
            console.log('ALL PRODUCTS ERRR', err);
          }
        });
      // this.isLoading = true;
      // this.allItemsM = this.api.items;
      // this.itemsM = [...this.api.items];
      // console.log('ITEMS:', this.itemsM);
    }, 1000);

  }

  onSearchChange(event: any) {
    this.query = event.detail.value.toLowerCase();
    console.log('FILTRO:', this.query);
    this.querySearch();
  }

  querySearch() {
    this.items = [];
    if (this.query.length > 0) {
      this.searchItems();
    } else {
      this.itemsF = [...this.allItemsF];
    }
  }

  searchItems() {
    this.itemsF = this.allItemsF.filter((item) =>
      item.title.toLowerCase().includes(this.query)
    );
  }

}
