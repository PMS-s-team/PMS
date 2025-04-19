// src/app/services/mock-data.service.ts
import { Injectable } from '@angular/core';
import { Item, Category, StockStatus } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private readonly mockItems: Item[] = [
    {
      id: 1,
      name: 'Laptop',
      category: Category.Electronics,
      quantity: 15,
      price: 1200,
      supplierName: 'Dell Technologies',
      stockStatus: StockStatus.InStock,
      featuredItem: 1,
      specialNote: '2023新款'
    },
    {
      id: 2,
      name: 'Office Chair',
      category: Category.Furniture,
      quantity: 8,
      price: 199,
      supplierName: 'IKEA',
      stockStatus: StockStatus.LowStock
    },
    {
      id: 3,
      name: 'T-Shirt',
      category: Category.Clothing,
      quantity: 0,
      price: 25,
      supplierName: 'Cotton On',
      stockStatus: StockStatus.OutOfStock,
      specialNote: '夏季促销款'
    },
    {
      id: 4,
      name: 'Drill',
      category: Category.Tools,
      quantity: 12,
      price: 89,
      supplierName: 'Bosch',
      stockStatus: StockStatus.InStock
    },
    {
      id: 5,
      name: 'Desk Lamp',
      category: Category.Miscellaneous,
      quantity: 23,
      price: 45,
      supplierName: 'Philips',
      stockStatus: StockStatus.InStock,
      featuredItem: 1
    }
  ];

  getAllItems(): Item[] {
    return [...this.mockItems]; // 返回深拷贝
  }

  getItemByName(name: string): Item | undefined {
    return this.mockItems.find(item => item.name.toLowerCase() === name.toLowerCase());
  }
}