import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonThumbnail, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonItem, IonLabel, IonButton, IonIcon, IonCard, IonImg, IonText, IonCol, IonRow, IonList, IonListHeader, IonItemGroup, IonFooter, IonItemDivider, IonModal } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { Strings } from '../models/strings.enum';
import { CouponsPage } from './components/coupons/coupons.page';
import { AddAddressComponent } from './components/add-address/add-address.component';
import { AdressessService } from 'src/app/services/adressess/adressess.service';
import { AddressesComponent } from './components/addresses/addresses.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [IonItemDivider, IonModal, IonThumbnail, IonFooter, IonItemGroup, IonListHeader, IonList, IonRow, IonCol, IonText, IonImg, IonCard, IonIcon, IonButton, IonLabel, IonItem, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, CouponsPage, AddAddressComponent, AddressesComponent]
})
export class CartPage implements OnInit, OnDestroy {

  @ViewChild('address_modal') address_modal!: IonModal;
  @ViewChild('add_address_modal') add_address_modal!: IonModal;
  previous!: string;
  cartSub!: Subscription;
  selectedCoupon!: any;
  applyCoupon = false;
  isAddAddress = false;
  isSelectAddress = false;
  isCheckoutToShippingAddress = false;
  address!: any;
  model: any = null;
  currency = Strings.CURRENCY;
  addresses: any[] = [];
  addressSub!: Subscription;
  
  private router = inject(Router);
  public cartService = inject(CartService);
  private addressService = inject(AdressessService);

  constructor() { }

  ngOnInit() {
    this.checkUrl();

    this.cartSub = this.cartService.cart.subscribe({
      next: (cart) => {
        this.model = cart;
      },
    });

    this.getAddresses();

    this.addressSub = this.addressService.addresses.subscribe({
      next: (addresses) => {
        this.addresses = addresses;
      },
    });
  }

  async getAddresses() {
    try {
      const addresses: any[] = await this.addressService.getAddresses();

      if (addresses?.length > 0) {
        this.address = addresses.find((address) => address.primary);
      }
    } catch (e) {
      console.log(e);
    }
  }

  checkUrl() {
    const route_url = this.router.url;
    const urlParts = route_url.split('/');
    urlParts.pop(); // Remove the last segment
    console.log(urlParts);
    this.previous = urlParts.join('/');
    console.log('url: ', this.previous);
  }

  addQuantity(item: any) {
    this.cartService.addQuantity(item);
  }

  subtractQuantity(item: any) {
    this.cartService.subtractQuantity(item);
  }

  closeCouponModal(coupon: any, couponModal: IonModal) {
    console.log('coupon data: ', coupon);
    if (coupon) {
      this.selectedCoupon = coupon;
      this.model.grandTotal -= this.selectedCoupon?.saved;
    }
    couponModal.dismiss();
  }

  removeCoupon() {
    this.model.grandTotal += this.selectedCoupon?.saved;
    this.selectedCoupon = null;
  }

  closeAddAddressModal(data: any) {
    console.log(data);
    this.add_address_modal.dismiss();
    if (data) {
      this.address = data;
      if (this.isCheckoutToShippingAddress) {
        // navigate to payment page
        this.isCheckoutToShippingAddress = false;
        this.navigateToPayout();
      }
    }
  }

  closeAddressModal(data: any) {
    this.address_modal.dismiss();
    if (data) {
      if (data == 1) {
        this.isAddAddress = true;
      } else {
        this.address = data;
      }
    }
  }

  checkout() {
    if (!this.address) {
      this.isAddAddress = true;
      this.isCheckoutToShippingAddress = true;
    } else {
      //navigate to payment page
      this.navigateToPayout();
    }
  }

  navigateToPayout() {

  }

  ngOnDestroy(): void {
    if (this.cartSub) this.cartSub.unsubscribe();
    if (this.addressSub) this.addressSub.unsubscribe();
  }

}