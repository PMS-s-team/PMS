// src/app/pages/list/list.page.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MockDataService } from '../../services/mock-data.service';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class ListPage {
  items: Item[] = [];

  constructor(private mockData: MockDataService) {
    this.items = this.mockData.getAllItems();
    console.log('Mock数据加载:', this.items); // 控制台验证
  }
}