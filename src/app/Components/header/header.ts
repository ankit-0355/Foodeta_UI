import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MenuService } from '../../services/menu-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  menusrv = inject(MenuService);
  constructor(public router: Router) {}

}
