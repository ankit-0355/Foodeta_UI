import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TiffinProvider, CartItem } from '../model/models';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  http = inject(HttpClient);
  cartOpen = signal(false);
  sidebarOpen = signal(false);
  cartItems = signal<CartItem[]>([]); // Signal to hold cart items
  total = signal(0); // Signal to hold total price


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
      const existingItem = items.find(i => i.item.id === item.id);
      if (existingItem) {
        // If item already exists in cart, increase quantity
        existingItem.quantity += 1;
      } else {
        // If item does not exist, add new item with quantity 1
        items.push({ item, quantity: 1 });
      }
      this.total.update(total => total + item.pricePerDay);
      return items;
    });
    
  }

  removeFromCart(ci: CartItem) {
    this.total.update(total => total - ci.item.pricePerDay*ci.quantity);
    this.cartItems.update(items => {
      return items.filter(i => i.item.id !== ci.item.id);
    });
  }

  increment(ci: CartItem) {
    ci.quantity += 1;
    this.total.update(total => total + ci.item.pricePerDay);
  }

  decrement(ci: CartItem) {
    ci.quantity -= 1;
    this.total.update(total => total - ci.item.pricePerDay);
  }

}
