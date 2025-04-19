import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'list',
        loadComponent: () => import('../pages/list/list.page').then(m => m.ListPage),
        data: { tab: 'list' } // 与tab-button关联的关键配置
      },
      {
        path: 'add',
        loadComponent: () => import('../pages/add/add.page').then(m => m.AddPage),
        data: { tab: 'add' }
      },
      {
        path: 'edit',
        loadComponent: () => import('../pages/edit/edit.page').then(m => m.EditPage),
        data: { tab: 'edit' }
      },
      {
        path: 'privacy',
        loadComponent: () => import('../pages/privacy/privacy.page').then(m => m.PrivacyPage),
        data: { tab: 'privacy' }
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      }
    ]
  }
];