import { Component, computed, inject, signal} from '@angular/core';
import { MenuService } from '../../services/menu-service';
import { MatIconModule } from '@angular/material/icon';
import { DecimalPipe } from '@angular/common';
import { Checkout } from "../checkout/checkout";

@Component({
  selector: 'app-cart',
  imports: [MatIconModule, DecimalPipe, Checkout],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  menusrv = inject(MenuService);
  cartOpen = computed(() => this.menusrv.cartOpen());
  showCheckout = signal(false);
  
  checkout() {
    this.showCheckout.update(v => !v);
    document.body.classList.toggle('no-scroll', this.showCheckout());
  }


  // cartItems = signal<TiffinProvider[]>([]); // Signal to hold cart items

}
