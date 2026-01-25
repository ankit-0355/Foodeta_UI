import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TiffinProvider, CartItem, CartExtra, extraItem } from '../model/models';
import { Extras } from '../Components/extras/extras';
import { delay } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  http = inject(HttpClient);
  snackBar = inject(MatSnackBar);
  cartOpen = signal(false);
  sidebarOpen = signal(false);
  cartItems = signal<CartItem[]>([]); // Signal to hold cart items
  total = signal(0); // Signal to hold total price of a single tiffin
  grandTotal = signal(0); // Signal to hold grand total price of cart
  showCheckout = signal(false);
  quantity = signal(0);
  orderPlaced = signal(false);
  showExtras = signal(false);
  tiffinItem = signal<any>(null);
  loading = signal(true);
  providers = signal <TiffinProvider[]>([]);    
  cartextra = signal<CartExtra[]>([]); // Signal to hold extras for cart items
  extraQuantities = computed(() =>
    new Map(this.cartextra().map(e => [e.item, e.quantity]))
  );


  // constructor() {
  //   this.callApi();
  // }

  OpenSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  callApi(url:any) {
    // return this.http.get<TiffinProvider[]>('https://foddeta-backend-1030483456536.northamerica-northeast2.run.app/database');
    this.http.get<TiffinProvider[]>(url).pipe(delay(2000))
      .subscribe({
      next: (res) => {
        console.log('Response:', res);
        this.loading.set(false);
        this.providers.set(res);
      },
      error: (err) => {console.error('API Error:', err)
        this.loading.set(false);
        this.OpenSnackBar("Failed to load data","OK");
      }
    });
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
    this.showExtras.update(v => !v) 
    this.cartItems.update(items => { 
      const existingItem = items.find(i => i.item.service_id === item.service_id);
      items.push({item, cartItemId: items.length + 1, extras: this.cartextra()}); 
      this.quantity.update(q => q + 1); 

      this.grandTotal.update(grandTotal => grandTotal + this.total());
      return items; 
    }); 
    }

  extrasDialog(item: TiffinProvider) { 
    this.cartextra.set([]);
    this.tiffinItem.set(item); 
    console.log(item)
    this.showExtras.update(v => !v);
    document.body.classList.toggle('no-scroll', this.showExtras()); 
    this.total.update(total => item.price);
  }

  removeFromCart(ci: CartItem) {
    this.grandTotal.update(grandTotal => grandTotal - (ci.item.price + ci.extras?.filter(e => e.quantity > 0).reduce((sum, e) => sum + (e.price * e.quantity), 0)!));
    this.quantity.update(q => q - 1);
    this.cartItems.update(items => {
      return items.filter(i => i !== ci);
    });
  }

  incrementExtra(extra: extraItem) {
    this.cartextra.update(extras => {
      const existing = extras.find(e => e.item === extra.name);
  
      if (existing) {
        // increment quantity if already exists
        return extras.map(e =>
          e.item === extra.name
            ? { ...e, quantity: e.quantity + 1 }
            : e
        );
      }
  
      // copy item & price, add quantity
      return [
        ...extras,
        {
          item: extra.name,
          price: extra.price,
          quantity: 1
        }
      ];
    });
  // console.log(this.total(), extra.price)
    this.total.update(total => total + extra.price);
  }
  

    decrementExtra(extra: extraItem) {
      this.cartextra.update(extras => {
        const existing = extras.find(e => e.item === extra.name);
  
        if (existing && existing.quantity >= 1) {
          this.total.update(total => total - extra.price);
          // decrement quantity if more than 1
          return extras.map(e =>
            e.item === extra.name
              ? { ...e, quantity: e.quantity - 1 }
              : e
          );
        } 
        return extras;
      }
       
      );

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