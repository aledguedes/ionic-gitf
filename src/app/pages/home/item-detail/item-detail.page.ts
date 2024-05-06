import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonFooter, IonIcon, IonText, IonItem, IonLabel, IonButtons, IonBackButton, IonBadge, NavController } from '@ionic/angular/standalone';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductService } from 'src/app/services/product/product.service';
import { ProductRes } from 'src/app/models/Product';
import { ProductFake } from 'src/app/models/FakeApi';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
  standalone: true,
  imports: [IonBadge, IonBackButton, IonButtons, IonLabel, IonItem, IonText, IonIcon, IonFooter, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink,]
})
export class ItemDetailPage implements OnInit, OnDestroy {

  // item: ProductRes = {
  //   id: 0,
  //   name: '',
  //   price: 0,
  //   status: true,
  //   rating: 0,
  //   cover: '',
  //   description: ''
  // };


  item: ProductFake = {
    id: 0,
    title: '',
    price: '',
    category: '',
    description: '',
    image: ''
  };
  addToBag!: any;
  totalItems = 0;
  cartSub!: Subscription;

  cartService = inject(CartService);

  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  private navCtrl = inject(NavController);
  private productService = inject(ProductService);

  constructor() { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id || id == '0') {
      this.navCtrl.back();
      return;
    }
    this.getItem(Number(id));
    this.cartSub = this.cartService.cart.subscribe({
      next: (cart) => {
        this.totalItems = cart ? cart?.totalItem : 0;
      }
    });
  }

  getItem(product_id: number) {
    this.productService.getProductIdFake(product_id).subscribe({
      next: (data) => {
        this.item = data;
        console.log('PRODUCTS BY ID DATA', data);
      },
      error: (err) => {
        console.log('PRODUCTS BY ID ERRR', err);
      }
    });
    // const id = this.route.snapshot.paramMap.get('id');
    // console.log('check id: ', id);
    // if (!id || id == '0') {
    //   this.navCtrl.back();
    //   return;
    // }
    // this.id = id;

    // this.item = this.api.items.find((record) => record.id == id);
    console.log(this.item);
  }

  addItem() {
    const result = this.cartService.addQuantity(this.item);
    this.addedText();
  }

  addedText() {
    this.addToBag = 'Added to Bag';
    setTimeout(() => {
      this.addToBag = null;
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.cartSub) this.cartSub.unsubscribe();
  }

}
