import { Component } from '@angular/core';
import { 
  IonTabs, 
  IonTabBar, 
  IonTabButton, 
  IonIcon, 
  IonLabel 
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
  standalone: true,  // 必须添加此项
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel]
})
export class TabsPage {
  constructor() {
    // 注册我们实际需要的图标
    addIcons({ 
      listOutline,
      addCircleOutline,
      createOutline,
      shieldCheckmarkOutline
    });
  }
}