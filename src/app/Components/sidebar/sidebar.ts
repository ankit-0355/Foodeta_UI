import { Component, computed, inject } from '@angular/core';
import { MenuService } from '../../services/menu-service'; 
import { RouterLink } from '@angular/router';
import { R } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
menusrv = inject(MenuService);
navOpen = computed(() => this.menusrv.sidebarOpen());
active: string = 'tiffins';

setActive(section: string) {
  this.active = section;
}

}
