
import { Component, signal } from '@angular/core';
import { PROVIDERS } from '../../model/mock_data';
import { TiffinProvider } from '../../model/models';

@Component({
  selector: 'app-menu',
  standalone: true,                               // most likely you have this
  imports: [],                               // ⬅️ make *ngFor work
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {
  providers = signal<TiffinProvider[]>([]);

  ngOnInit() {
    this.providers.set(PROVIDERS);                // load all mock data
  }
}
