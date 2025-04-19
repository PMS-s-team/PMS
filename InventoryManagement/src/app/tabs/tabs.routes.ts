import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'list',
        loadComponent: () => import('../pages/list/list.page').then(m => m.ListPage)
      },
      {
        path: 'add',
        loadComponent: () => import('../pages/add/add.page').then(m => m.AddPage)
      },
      {
        path: 'edit',
        loadComponent: () => import('../pages/edit/edit.page').then(m => m.EditPage)
      },
      {
        path: 'privacy',
        loadComponent: () => import('../pages/privacy/privacy.page').then(m => m.PrivacyPage)
      },
      {
        path: '',
        redirectTo: '/tabs/list',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/list',
    pathMatch: 'full'
  }
];