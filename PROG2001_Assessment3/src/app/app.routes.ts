import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tabs',
    loadComponent: () => import('./tabs/tabs.page').then(m => m.TabsPage),
    children: [
      {
        path: 'item-list',  // 列表页（对应 Tab1）
        loadComponent: () => import('./pages/item-list/item-list.page').then(m => m.ItemListPage),
      },
      {
        path: 'add-item',   // 添加页（对应 Tab2）
        loadComponent: () => import('./pages/add-item/add-item.page').then(m => m.AddItemPage),
      },
      {
        path: 'privacy',    // 隐私页（对应 Tab3）
        loadComponent: () => import('./pages/privacy/privacy.page').then(m => m.PrivacyPage),
      },
      { path: '', redirectTo: 'tabs/item-list', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: 'tabs/item-list', pathMatch: 'full' },
];