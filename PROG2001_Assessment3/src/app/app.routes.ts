import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'tabs', pathMatch: 'full' },
  {
    path: 'tabs',
    loadComponent: () => import('./tabs/tabs.page').then(m => m.TabsPage),
    children: [
      { path: 'tab1', loadComponent: () => import('./tab1/tab1.page').then(m => m.Tab1Page) },
      { path: 'tab2', loadComponent: () => import('./tab2/tab2.page').then(m => m.Tab2Page) },
      { path: 'tab3', loadComponent: () => import('./tab3/tab3.page').then(m => m.Tab3Page) },
      // 把你的菜单和场景页作为子路由
      { path: 'menu', loadComponent: () => import('./menu/menu.page').then(m => m.MenuPage) },
      { path: 'scene1', loadComponent: () => import('./scene1/scene1.page').then(m => m.Scene1Page) }
    ]
  }
];