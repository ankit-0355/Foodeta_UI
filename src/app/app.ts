import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './Components/footer/footer';
import { Header } from './Components/header/header';
import { Menu } from './Components/menu/menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Header, Menu],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Foodeta_UI');
}
