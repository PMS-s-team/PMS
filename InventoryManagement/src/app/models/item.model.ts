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

// 定义商品接口
export interface Item {
  id: number;           // 唯一标识，自动递增
  name: string;         // 商品名称，必填且唯一
  category: Category;   // 商品类别
  quantity: number;     // 库存数量，必填（整数）
  price: number;        // 商品价格，必填（整数）
  supplierName: string; // 供应商名称，必填
  stockStatus: StockStatus; // 库存状态
  featuredItem?: number; // 是否为特色商品（0=非特色, 1=特色），默认值为0
  specialNote?: string;  // 特殊备注（可选）
}