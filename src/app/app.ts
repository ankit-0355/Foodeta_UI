import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './Components/footer/footer';
import { Header } from './Components/header/header';
// import { Menu } from './Components/menu/menu';
import { Cart } from "./Components/cart/cart";
import { Sidebar } from "./Components/sidebar/sidebar";
// import { Mart } from "./Components/mart/mart";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Header, Cart, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Foodeta_UI');
}
