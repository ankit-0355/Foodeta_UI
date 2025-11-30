import { Component } from '@angular/core';
import { signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-footer',
  imports: [MatIconModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  year = signal(new Date().getFullYear());  // <-- use this in template
}
