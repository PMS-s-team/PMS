// src/app/models/item.model.ts
export enum Category {
  Electronics = 'Electronics',
  Furniture = 'Furniture',
  Clothing = 'Clothing',
  Tools = 'Tools',
  Miscellaneous = 'Miscellaneous'
}

export enum StockStatus {
  InStock = 'In Stock',
  LowStock = 'Low Stock',
  OutOfStock = 'Out of Stock'
}

export interface Item {
  id: number;           // Unique, Auto-incrementing
  name: string;         // Required (Unique)
  category: Category;
  quantity: number;     // Required (Integer)
  price: number;        // Required (Integer)
  supplierName: string; // Required
  stockStatus: StockStatus;
  featuredItem?: number; // Default: 0 (0=非特色, 1=特色)
  specialNote?: string;  // Optional
}