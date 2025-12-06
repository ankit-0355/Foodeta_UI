import { Component, computed, inject} from '@angular/core';
import { MenuService } from '../../services/menu-service';
import { MatIconModule } from '@angular/material/icon';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [MatIconModule, DecimalPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  menusrv = inject(MenuService);
  cartOpen = computed(() => this.menusrv.cartOpen());
  
  // cartItems = signal<TiffinProvider[]>([]); // Signal to hold cart items

}
