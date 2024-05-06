import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonSpinner, IonCard, IonRow, IonLabel, IonCol, IonItem, IonText, IonGrid } from '@ionic/angular/standalone';
import { ApiService } from 'src/app/services/api/api.service';
import { Strings } from '../../../models/strings.enum';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.page.html',
  styleUrls: ['./coupons.page.scss'],
  standalone: true,
  imports: [IonGrid, IonText, IonItem, IonCol, IonLabel, IonRow, IonCard, IonSpinner, IonIcon, IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CouponsPage implements OnInit {

  @Input() orderTotal!: number;
  @Output() close: EventEmitter<any> = new EventEmitter();
  coupons: any[] = [];
  isLoading: boolean = false;
  currency = Strings.CURRENCY;
  private apiService = inject(ApiService);

  constructor() { }

  ngOnInit() {
    this.getCoupons();
  }

  async getCoupons() {
    try {
      this.isLoading = true;
      const coupons = this.apiService.getCoupons();
      if (coupons.length > 0) {
        coupons.map((coupon: any) => {
          coupon.saved = this.getSavedAmount(coupon);
          return coupon;
        });
        this.coupons = [...coupons];
      }
      this.isLoading = false;
    } catch (e) {
      this.isLoading = false;
      console.log(e);
    }
  }

  getSavedAmount(coupon: any) {
    let amt = 0;
    if (coupon?.minimumOrderAmount) {
      amt = this.orderTotal - coupon.minimumOrderAmount;
      if (amt < 0) return amt;
    }
    amt = coupon?.isPercentage
      ? this.orderTotal * (coupon?.discount / 100)
      : coupon?.discount;
    if (coupon?.upto_discount) {
      console.log('check amt: ', amt);
      amt = amt >= coupon.upto_discount ? coupon.upto_discount : amt;
    }
    return amt;
  }

  closeModal(data?: any) {
    this.close.emit(data);
  }

}
