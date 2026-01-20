import { Routes } from '@angular/router';
import { Mart } from './Components/mart/mart';
import { Menu } from './Components/menu/menu';
import { Register } from './Components/register/register';
import { Dashboard } from './Components/dashboard/dashboard';
import { Profile } from  './Components/dashboard/profile/profile';
import { Dailymenu } from './Components/dashboard/dailymenu/dailymenu'
import { Extras } from './Components/dashboard/extras/extras';

export const routes: Routes = [
    { path: '', component: Menu },
    { path: 'mart', component: Mart },
    { path: 'register', component: Register },
    { path: 'dashboard', component: Dashboard, 
        children: [
            { path: '', redirectTo: 'profile', pathMatch: 'full'},
            { path: 'profile', component: Profile },
            { path: 'menu', component: Dailymenu },
            { path: 'extra', component: Extras },
        ]
    },
];
