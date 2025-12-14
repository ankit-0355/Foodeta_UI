import { Component, inject } from '@angular/core';
import { MenuService } from '../../services/menu-service';
import { DecimalPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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

  checkoutForm = this.fb.group({
    fullName: [''],
    phone: [''],
    email: [''],
    address: [''],
    comments: ['']
  });

  placeOrder() {
    if (this.checkoutForm.valid) {
      const orderDetails = {
        customerInfo: this.checkoutForm.value,
        service_detail: this.menusrv.cartItems().map(ci => ({
          service_id: ci.item.service_id,
          service_name: ci.item.service_name,
          quantity: ci.quantity,
          price_per_item: ci.item.price,
          total_price: ci.item.price * ci.quantity
        })),
        totalAmount: this.menusrv.total()
      };
      const url="http://127.0.0.1:8000/place-order"
      this.http.post(url, orderDetails).subscribe({
            next: (res) => {
              console.log('Order placed successfully:', res);
            },
            error: (err) => console.error('Order placement failed:', err)
          });
      console.log('Order Placed:', orderDetails);
      // Clear cart after placing order
      this.menusrv.cartItems.set([]);
      this.menusrv.total.set(0);
      this.menusrv.quantity.set(0);
      this.checkoutForm.reset();
      this.menusrv.showCheckout.set(false);
      this.menusrv.cartOpen.set(false);
    } else {
      alert('Please fill in all required fields.');
    }
  }

}
