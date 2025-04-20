import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { 
  IonHeader, IonToolbar, IonTitle, IonSearchbar,
  IonContent, IonList, IonItemSliding, IonItem,
  IonItemOptions, IonItemOption, IonRefresher,
  IonRefresherContent, IonSpinner, IonText, IonLabel,
  IonBadge
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Item } from '../../models/item.model';
import { ToastController } from '@ionic/angular/standalone';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    FormsModule,
    NgFor,
    NgIf,
    IonHeader, IonToolbar, IonTitle, IonSearchbar,
    IonContent, IonList, IonItemSliding, IonItem,
    IonItemOptions, IonItemOption, IonRefresher,
    IonRefresherContent, IonSpinner, IonText, IonLabel,
    IonBadge
  ],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>库存清单</ion-title>
      </ion-toolbar>
      <ion-toolbar>
        <ion-searchbar 
          [(ngModel)]="searchTerm" 
          placeholder="搜索商品名称"
          debounce="300"
          (ionInput)="searchSubject.next(searchTerm)">
        </ion-searchbar>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-refresher slot="fixed" (ionRefresh)="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <div *ngIf="isLoading" class="loading-wrapper">
        <ion-spinner name="crescent"></ion-spinner>
      </div>

      <div *ngIf="!isLoading && filteredItems.length === 0" class="empty-state">
        <ion-text color="medium">
          {{ searchTerm ? '未找到匹配商品' : '暂无库存数据' }}
        </ion-text>
      </div>

      <ion-list *ngIf="!isLoading && filteredItems.length > 0">
        <ion-item-sliding *ngFor="let item of filteredItems; trackBy: trackById">
          <ion-item>
            <ion-label>
              <h2>{{ item.name || '未命名商品' }}</h2>
              <p>
                类别: {{ item.category || '未分类' }} | 
                库存: {{ item.quantity ?? 'N/A' }} | 
                状态: <span [class]="getStatusClass(item.stockStatus)">
                  {{ item.stockStatus || '未知状态' }}
                </span>
              </p>
              <p>供应商: {{ item.supplierName || '未知供应商' }}</p>
              <ion-badge *ngIf="item.featuredItem === 1" color="warning" slot="end">
                ⭐ 特色
              </ion-badge>
            </ion-label>
          </ion-item>

          <ion-item-options side="end">
            <ion-item-option 
              color="danger" 
              (click)="confirmDelete(item.name)"
              [disabled]="!item.name">
              删除
            </ion-item-option>
          </ion-item-options>
        </ion-item-sliding>
      </ion-list>
    </ion-content>
  `,
  styles: [`
    .loading-wrapper, .empty-state {
      display: flex;
      justify-content: center;
      padding: 20px;
      text-align: center;
    }
    .status-in-stock {
      color: var(--ion-color-success);
    }
    .status-low-stock {
      color: var(--ion-color-warning);
    }
    .status-out-of-stock {
      color: var(--ion-color-danger);
    }
    .status-unknown {
      color: var(--ion-color-medium);
    }
    ion-badge {
      margin-left: 8px;
      vertical-align: middle;
    }
    ion-item-option[disabled] {
      opacity: 0.5;
      pointer-events: none;
    }
  `]
})
export class ListPage {
  items: Item[] = [];
  searchTerm = '';
  isLoading = false;
  searchSubject = new Subject<string>();

  constructor(
    private api: ApiService,
    private toastCtrl: ToastController
  ) {
    this.initializeData();
    this.setupSearchDebounce();
  }

  // 初始化数据
  private initializeData() {
    console.log('--- 初始化数据加载 ---');
    this.api.setMockMode(false);
    this.loadData();
    
    // 测试删除保护
    this.api.deleteItem('Laptop').subscribe({
      error: (err) => console.log('防删测试:', err.message)
    });
  }

  // 更安全的过滤方法
  get filteredItems(): Item[] {
    return this.items.filter(item => {
      try {
        const itemName = item?.name?.toString() || '';
        const searchTerm = this.searchTerm?.toString() || '';
        return itemName.toLowerCase().includes(searchTerm.toLowerCase());
      } catch (e) {
        console.warn('过滤出错:', e);
        return false;
      }
    });
  }

  // 防抖搜索
  private setupSearchDebounce() {
    this.searchSubject.pipe(
      debounceTime(300)
    ).subscribe(() => {
      console.log('搜索:', this.searchTerm);
    });
  }

  // 跟踪函数优化性能
  trackById(index: number, item: Item): number {
    return item.id || index;
  }

  // 状态类安全获取
  getStatusClass(status?: string): string {
    if (!status) return 'status-unknown';
    const normalized = status.toLowerCase().replace(/\s+/g, '-');
    return `status-${normalized}`;
  }

  async loadData() {
    this.isLoading = true;
    try {
      const data = await this.api.getAllItems().toPromise();
      this.items = Array.isArray(data) ? data : [];
    } catch (err) {
      console.error('数据加载失败:', err);
      this.items = [];
      this.showError('数据加载失败，请下拉刷新');
    } finally {
      this.isLoading = false;
    }
  }

  async confirmDelete(name: string) {
    if (!name) {
      this.showError('无效的商品名称');
      return;
    }

    const toast = await this.toastCtrl.create({
      message: `确认删除 ${name}？`,
      duration: 3000,
      buttons: [
        { text: '取消', role: 'cancel' },
        { 
          text: '删除', 
          handler: () => this.deleteItem(name)
        }
      ]
    });
    await toast.present();
  }

  private async deleteItem(name: string) {
    try {
      await this.api.deleteItem(name).toPromise();
      this.items = this.items.filter(i => i.name !== name);
      this.showToast(`已删除: ${name}`);
    } catch (err) {
      this.showError(err instanceof Error ? err.message : '删除失败');
    }
  }

  handleRefresh(event: Event) {
    const refresher = event.target as HTMLIonRefresherElement;
    this.loadData().finally(() => {
      refresher?.complete();
    });
  }

  private async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'top'
    });
    await toast.present();
  }

  private showError(message: string) {
    console.error('操作失败:', message);
    this.showToast(message);
  }
}