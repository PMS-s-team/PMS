import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'list',
    loadComponent: () => import('./pages/list/list.page').then(m => m.ListPage)
  },
  {
    path: 'add',
    loadComponent: () => import('./pages/add/add.page').then(m => m.AddPage)
  },
  {
    path: 'edit',
    loadComponent: () => import('./pages/edit/edit.page').then(m => m.EditPage)
  },
  {
    path: 'privacy',
    loadComponent: () => import('./pages/privacy/privacy.page').then(m => m.PrivacyPage)
  },
  
];