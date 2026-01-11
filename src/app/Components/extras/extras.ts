import { Component, inject, signal, WritableSignal } from '@angular/core';
import { MenuService } from '../../services/menu-service';
import { DecimalPipe } from '@angular/common';
import { TiffinProvider } from '../../model/models';

@Component({
  selector: 'app-extras',
  imports: [DecimalPipe],
  templateUrl: './extras.html',
  styleUrl: './extras.css',
})
export class Extras {
  menusrv = inject(MenuService)
  tiffinitem = signal<TiffinProvider>(this.menusrv.tiffinItem());

}
