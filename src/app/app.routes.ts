import { Routes } from '@angular/router';
import { Mart } from './Components/mart/mart';
import { Menu } from './Components/menu/menu';

export const routes: Routes = [
    {path: '', component: Menu},
    { path: 'mart', component: Mart }
];
