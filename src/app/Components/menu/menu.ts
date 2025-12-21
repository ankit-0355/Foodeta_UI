
import { Component, inject, signal } from '@angular/core';
import { CartItem, TiffinProvider } from '../../model/models';
import { MenuService } from '../../services/menu-service';
import { DatePipe } from '@angular/common';
import { PROVIDERS } from '../../model/mock_data';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatIcon } from "@angular/material/icon";
import { delay } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu',
  standalone: true,                               
  imports: [DatePipe, MatProgressBarModule, MatIcon],                               
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {
  providers = signal <TiffinProvider[]>([]);        // signal to hold tiffin providers
  menusrv = inject(MenuService);
  loading = signal(false);                     // signal to indicate loading state
  router = inject(Router);
  _snackBar = inject(MatSnackBar);

  getQuantity(serviceId: string,op?:string): number {
    const ci = this.menusrv.cartItems().find(ci => ci.item.service_id === serviceId);
    return ci ? ci.quantity : 0;
  }

  getci(serviceId: string): any {
    const ci = this.menusrv.cartItems().find(ci => ci.item.service_id === serviceId);
    return ci;
  }

  OpenSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  ngOnInit() {
    this.providers.set(PROVIDERS); // load all mock data
    // this.menusrv.callApi()
    // .pipe(delay(2000))
    // .subscribe({
    //   next: (res) => {
    //     console.log('Response:', res);
    //     this.loading.set(false);
    //     this.providers.set(res);
    //   },
    //   error: (err) => {console.error('API Error:', err)
    //     this.loading.set(false);
    //     this.OpenSnackBar("Failed to load data","OK");
    //  }
    // });
  }
}
