import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth-guard';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
    canActivate: [AuthGuard]
  },
  {
    path: 'inventory-items',
    loadComponent: () => import('./inventory-items/inventory-items.page').then( m => m.InventoryItemsPage)
  },
];