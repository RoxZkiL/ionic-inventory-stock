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
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage),
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    loadComponent: () => import('./inventory-items/inventory-items.page').then(m => m.InventoryItemsPage),
    canActivate: [AuthGuard],
    data: { title: 'StockWise', showBack: false }
  },
  {
    path: 'item-detail/:id',
    loadComponent: () => import('./item-detail/item-detail.page').then( m => m.ItemDetailPage),
    canActivate: [AuthGuard],
    data: { title: 'Detalle del Ítem', showBack: true }
  },
];