import { Routes } from '@angular/router';
import { Mart } from './Components/mart/mart';
import { Menu } from './Components/menu/menu';
import { Register } from './Components/dashboard/register/register';
import { Dashboard } from './Components/dashboard/dashboard';
import { Profile } from  './Components/dashboard/profile/profile';
import { Dailymenu } from './Components/dashboard/dailymenu/dailymenu'
import { Extras } from './Components/dashboard/extras/extras';
import { Login } from './Components/dashboard/login/login';

export const routes: Routes = [
    { path: '', component: Menu },
    { path: 'mart', component: Mart },
    // { path: 'register', component: Register },
    { path: 'login', component: Login },
    { path: 'dashboard', 
        children: [
            { path: '', redirectTo: 'profile/:userid', pathMatch: 'full'},
            { path: 'profile/:userid', component: Profile },
            { path: 'menu/:userid', component: Dailymenu },
            { path: 'extra/:userid', component: Extras },
        ]
    },
    { path: '**', component: Login  }

];
