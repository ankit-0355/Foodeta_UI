import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TiffinProvider, CartItem } from '../model/models';
import { FocusNext } from '@angular/cdk/menu';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  http = inject(HttpClient);
  cartOpen = signal(false);
  sidebarOpen = signal(false);
  cartItems = signal<CartItem[]>([]); // Signal to hold cart items
  total = signal(0); // Signal to hold total price
  showCheckout = signal(false);
  quantity = signal(0);
  orderPlaced = signal(false);


  constructor() {
    this.callApi();
  }

  callApi() {
    return this.http.get<TiffinProvider[]>('http://127.0.0.1:8000/database');
  }

  toggleCart() {
    this.cartOpen.update(value => !value);
    document.body.classList.toggle('no-scroll', this.cartOpen());
  }

  toggleSidenav() {
    this.sidebarOpen.update(value => !value);
    document.body.classList.toggle('no-scroll', this.sidebarOpen());
  }

  addToCart(item: TiffinProvider) {
    this.cartItems.update(items => {
      const existingItem = items.find(i => i.item.service_id === item.service_id);
      if (existingItem) {
        // If item already exists in cart, increase quantity
        existingItem.quantity += 1;
        this.quantity.update(q => q + 1);
      } else {
        // If item does not exist, add new item with quantity 1
        items.push({ item, quantity: 1 });
        this.quantity.update(q => q + 1);
      }
      this.total.update(total => total + item.price);
      // setTimeout(() => {
      //   this.addedMap.update(m => ({
      //     ...m,
      //     [item.service_id]: false
      //   }));
      // }, 800);
      return items;
    });
    
  }

  removeFromCart(ci: CartItem) {
    this.total.update(total => total - ci.item.price*ci.quantity);
    this.cartItems.update(items => {
      return items.filter(i => i.item.service_id !== ci.item.service_id);
    });
    this.quantity.update(q => q - ci.quantity);
  }

  increment(ci: CartItem) {
    ci.quantity += 1;
    this.total.update(total => total + ci.item.price);
    this.quantity.update(q => q + 1);
  }

  decrement(ci: CartItem) {
    if(ci.quantity <= 1) {
      this.cartItems.update(items => {
        return items.filter(i => i.item.service_id !== ci.item.service_id);
      });
    }
    ci.quantity -= 1;
    this.total.update(total => total - ci.item.price);
    this.quantity.update(q => q - 1);
  }

  checkout() {
    this.showCheckout.update(v => !v);
    document.body.classList.toggle('no-scroll', this.showCheckout());
  }

  orderflag() {
      if(this.orderPlaced()){
        setTimeout(() => {
          this.orderPlaced.set(false);
          console.log('Order placed flag reset', this.orderPlaced());
          document.body.classList.remove('no-scroll');
        }, 2000);
      }
    }
}
