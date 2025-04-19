import { Component } from '@angular/core';
import { 
  IonTabs, 
  IonTabBar, 
  IonTabButton, 
  IonIcon, 
  IonLabel,
  IonRouterOutlet 
} from '@ionic/angular/standalone';
import { 
  listOutline, 
  addCircleOutline, 
  createOutline, 
  shieldCheckmarkOutline 
} from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [
    IonTabs, 
    IonTabBar, 
    IonTabButton, 
    IonIcon, 
    IonLabel,
    IonRouterOutlet  // 必须导入
  ]
})
export class TabsPage {
  constructor() {
    // 注册图标
    addIcons({ 
      listOutline,
      addCircleOutline,
      createOutline,
      shieldCheckmarkOutline
    });
  }
}