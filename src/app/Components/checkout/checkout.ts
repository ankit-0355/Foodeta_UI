import { Component, inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MenuService } from '../../services/menu-service';
import { DecimalPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

declare const google: any;

@Component({
  selector: 'app-checkout',
  imports: [DecimalPipe, ReactiveFormsModule], 
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  menusrv = inject(MenuService);
  http = inject(HttpClient);
  fb = inject(FormBuilder);

  @ViewChild('addressInput') addressInput!: ElementRef<HTMLInputElement>;
  autocomplete!: any;

  checkoutForm = this.fb.group({
    fullName: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    email: ['', [Validators.required, Validators.email]],
    address: ['', [Validators.required]],
    comments: ['']
  });



  ngAfterViewInit(): void {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.addressInput.nativeElement,
      {
        types: ['address'],
        componentRestrictions: { country: 'ca' }
      }
    );

    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete.getPlace();

      if (!place.formatted_address) return;

      this.checkoutForm.patchValue({
        address: place.formatted_address
      });

      // Optional: store lat/lng if needed later
      // const lat = place.geometry?.location?.lat();
      // const lng = place.geometry?.location?.lng();
    });
  }

  placeOrder() {
    if (this.checkoutForm.valid) {
      const orderDetails = {
        customerInfo: this.checkoutForm.value,
        service_detail: this.menusrv.cartItems().map(ci => ({
          service_id: ci.item.service_id,
          service_name: ci.item.service_name,
          price_per_item: ci.item.price,
          total_price: ci.item.price
        })),
        totalAmount: this.menusrv.total()
      };
      const url="https://foddeta-backend-1030483456536.northamerica-northeast2.run.app/place-order"
      this.http.post(url, orderDetails).subscribe({
            next: (res) => {
              // console.log('Order placed successfully:', res);
            },
            error: (err) => console.error('Order placement failed:', err)
          });
      // console.log('Order Placed:', orderDetails);
      // Clear cart after placing order
      this.menusrv.cartItems.set([]);
      this.menusrv.total.set(0);
      this.menusrv.quantity.set(0);
      this.checkoutForm.reset();
      this.menusrv.showCheckout.set(false);
      this.menusrv.cartOpen.set(false);
      this.menusrv.orderPlaced.update( v => !v);
      this.menusrv.orderflag();
    } else {
      // alert('Please fill in all required fields.');
    }
  }

}
