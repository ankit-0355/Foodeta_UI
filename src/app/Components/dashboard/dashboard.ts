import { Component, signal } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { RouterLink } from '@angular/router'; 


@Component({
  selector: 'app-dashboard',
  imports: [ RouterOutlet , RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
userid=signal(localStorage.getItem('businessid'))
businessname = signal(localStorage.getItem('businessname'))
}
