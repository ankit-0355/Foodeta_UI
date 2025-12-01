
import { Component, inject, signal } from '@angular/core';
import { TiffinProvider } from '../../model/models';
import { MenuService } from '../../services/menu-service';
import { DatePipe } from '@angular/common';
import { PROVIDERS } from '../../model/mock_data';


@Component({
  selector: 'app-menu',
  standalone: true,                               
  imports: [DatePipe],                               
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {
  providers = signal <TiffinProvider[]>([]);        // signal to hold tiffin providers
  menusrv = inject(MenuService);

  ngOnInit() {
    // this.providers.set(PROVIDERS); // load all mock data
    this.menusrv.callApi().subscribe({
      next: (res) => {
        console.log('Response:', res);
        this.providers.set(res);
      },
      error: (err) => console.error('API Error:', err)
    });
  }
}
