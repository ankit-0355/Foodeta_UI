import { Component, computed, inject } from '@angular/core';
import { MenuService } from '../../services/menu-service'; 
@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
menusrv = inject(MenuService);
navOpen = computed(() => this.menusrv.sidebarOpen());

}
