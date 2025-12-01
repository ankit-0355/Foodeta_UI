import { Component, computed, inject, signal} from '@angular/core';
import { MenuService } from '../../services/menu-service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cart',
  imports: [ MatIconModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  menusrv = inject(MenuService);
  cartOpen = computed(() => this.menusrv.cartOpen());
}
