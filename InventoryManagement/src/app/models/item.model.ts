// 定义商品类别枚举
export enum Category {
  Electronics = 'Electronics',
  Furniture = 'Furniture',
  Clothing = 'Clothing',
  Tools = 'Tools',
  Miscellaneous = 'Miscellaneous'
}

// 定义库存状态枚举
export enum StockStatus {
  InStock = 'In Stock',
  LowStock = 'Low Stock',
  OutOfStock = 'Out of Stock'
}

// src/app/models/item.model.ts
export interface Item {
  id: string; // 商品ID，字符串类型
  name: string; // 商品名称，字符串类型，必填
  category: Category; // 类别，枚举类型
  quantity: number; // 数量，整数类型，必填
  price: number; // 价格，整数类型，必填
  supplierName: string; // 供应商名称，字符串类型，必填
  stockStatus: StockStatus; // 库存状态，枚举类型
  featuredItem?: number; // 特色商品，整数类型，默认值为0
  specialNote?: string; // 特别备注，字符串类型，可选
}