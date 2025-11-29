
import { Component, inject, signal } from '@angular/core';
import { PROVIDERS } from '../../model/mock_data';
import { TiffinProvider } from '../../model/models';
import { MenuService } from '../../services/menu-service';

@Component({
  selector: 'app-menu',
  standalone: true,                               
  imports: [],                               
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {
  providers = signal<TiffinProvider[]>([]);        // signal to hold tiffin providers
  menusrv = inject(MenuService);

  ngOnInit() {
    this.providers.set(PROVIDERS); // load all mock data
    // this.menusrv.callApi(); // call the API
    console.log('Menu Component Initialized calinf data()');
    this.data();
  }

  data() {
    this.menusrv.callApi().subscribe({
      next: (res: any) => {
        console.log('Data from API:', res);
        console.log('id:', res["Database response"][0]["id"]);
      },
      error: (err) => console.error('Error:', err)
    });
  }
}
