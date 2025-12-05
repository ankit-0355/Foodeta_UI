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

  constructor() {
    this.callApi();
  }

  callApi() {
    return this.http.get<TiffinProvider[]>('http://127.0.0.1:8000/database');
  }

  toggleCart() {
    this.cartOpen.update(value => !value);
    console.log("Cart toggler",this.cartOpen());
  }

  toggleSidenav() {
    this.sidebarOpen.update(value => !value);
    console.log("Sidenav toggler",this.sidebarOpen());
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
      console.log("Cart Items:", items);
      return items;
    });
  }

  removeFromCart(item: TiffinProvider) {
    this.cartItems.update(items => {
      return items.filter(i => i.item.id !== item.id);
    });
  }

  increment(item: TiffinProvider) {
    this.cartItems.update(items =>
      items.map(ci =>
        ci.item.id === item.id
          ? { ...ci, quantity: ci.quantity + 1 }
          : ci
      )
    );
  }

  decrement(item: TiffinProvider) {
    this.cartItems.update( items => 
    items.map(ci => 
        ci.item.id === item.id ? { ...ci, quantity: ci.quantity - 1 } : ci
    ).filter(ci => ci.quantity > 0) // Remove item if quantity is 0
  );
  }

}
