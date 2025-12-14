
import { Component, inject, signal } from '@angular/core';
import { TiffinProvider } from '../../model/models';
import { MenuService } from '../../services/menu-service';
import { DatePipe } from '@angular/common';
import { PROVIDERS } from '../../model/mock_data';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { delay } from 'rxjs';


@Component({
  selector: 'app-menu',
  standalone: true,                               
  imports: [DatePipe, MatProgressBarModule],                               
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {
  providers = signal <TiffinProvider[]>([]);        // signal to hold tiffin providers
  menusrv = inject(MenuService);
  loading = signal(false);

  ngOnInit() {
    this.providers.set(PROVIDERS); // load all mock data
    // this.menusrv.callApi()
    // .pipe(delay(1000))
    // .subscribe({
    //   next: (res) => {
    //     console.log('Response:', res);
    //     this.loading.set(false);
    //     this.providers.set(res);
    //   },
    //   error: (err) => console.error('API Error:', err)
    // });
  }
}
