import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TiffinProvider } from '../model/models';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  http = inject(HttpClient);
  cartOpen = signal(false);
  sidebarOpen = signal(false);

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
    this.sidebarOpen.update(v => !v);
    console.log("Sidenav toggler",this.sidebarOpen());
  }

}
