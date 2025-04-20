// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError, of, map, tap } from 'rxjs';
import { Item, Category, StockStatus } from '../models/item.model';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = 'https://prog2005.it.scu.edu.au/ArtGalley';
  public useMock = false;
  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private mockData: MockDataService
  ) { }

  /**
   * 增强的错误处理方法
   * @param error Http错误响应
   * @returns 可观察的错误流
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage: string;
    
    if (error.status === 0) {
      errorMessage = '网络错误: 请检查网络连接';
    } else if (error.status === 404) {
      errorMessage = '资源未找到';
    } else if (error.status === 403) {
      errorMessage = '无权限访问此资源';
    } else {
      errorMessage = error.error?.message || error.message || '未知错误';
    }

    console.error(`API Error [${error.status}]:`, errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  /**
   * 获取所有商品
   * @returns 商品数组的可观察对象
   */
  getAllItems(): Observable<Item[]> {
    return this.useMock
      ? of(this.mockData.getAllItems()).pipe(
          tap(() => console.log('Using mock data for getAllItems'))
        )
      : this.http.get<Item[]>(`${this.baseUrl}/`, this.httpOptions).pipe(
          catchError(this.handleError),
          tap(data => console.log('API Response:', data))
        );
  }

  /**
   * 按名称查询商品
   * @param name 商品名称
   * @returns 商品信息或undefined的可观察对象
   */
  getItemByName(name: string): Observable<Item | undefined> {
    if (!name?.trim()) {
      return throwError(() => new Error('商品名称不能为空'));
    }

    return this.useMock
      ? of(this.mockData.getItemByName(name)).pipe(
          tap(found => console.log('Mock search for:', name, 'Found:', !!found))
        )
      : this.http.get<Item>(`${this.baseUrl}/${encodeURIComponent(name)}`, this.httpOptions).pipe(
          catchError(this.handleError),
          tap(item => console.log('Found item:', item))
        );
  }

  /**
   * 按ID查询商品
   * @param id 商品ID
   * @returns 商品信息或undefined的可观察对象
   */
  getItemById(id: string): Observable<Item | undefined> {
    if (!id?.trim()) {
      return throwError(() => new Error('商品ID不能为空'));
    }

    return this.useMock
      ? of(this.mockData.getItemById(id)).pipe(
          tap(found => console.log('Mock search for:', id, 'Found:', !!found))
        )
      : this.http.get<Item>(`${this.baseUrl}/${encodeURIComponent(id)}`, this.httpOptions).pipe(
          catchError(this.handleError),
          tap(item => console.log('Found item:', item))
        );
  }

/**
 * 添加新商品
 * @param item 不包含id的商品信息
 * @returns 添加后的商品信息（包含生成的id）
 */
addItem(item: Omit<Item, 'id'>): Observable<Item> {
  if (!item.name?.trim()) {
    return throwError(() => new Error('商品名称不能为空'));
  }

  if (this.useMock) {
    const newItem: Item = {
      ...item,
      id: String(Date.now()), // 修复：将 number 转换为 string
      featuredItem: item.featuredItem || 0  // 默认值处理
    };
    return of(newItem).pipe(
      tap(() => console.log('Mock add item:', newItem))
    );
  }

  return this.http.post<Item>(`${this.baseUrl}/`, item, this.httpOptions).pipe(
    catchError(this.handleError),
    tap(addedItem => console.log('Added item:', addedItem))
  );
}

  /**
   * 更新商品信息
   * @param name 要更新的商品名称
   * @param updates 需要更新的字段
   * @returns 更新后的完整商品信息
   */
  updateItem(name: string, updates: Partial<Item>): Observable<Item> {
    if (!name?.trim()) {
      return throwError(() => new Error('商品名称不能为空'));
    }

    if (this.useMock) {
      const updated = this.mockData.updateItemByName(name, updates);
      if (!updated) {
        return throwError(() => new Error('找不到要更新的商品'));
      }
      return of(updated).pipe(
        tap(() => console.log('Mock update:', updated))
      );
    }

    return this.http.put<Item>(
      `${this.baseUrl}/${encodeURIComponent(name)}`, 
      updates, 
      this.httpOptions
    ).pipe(
      catchError(this.handleError),
      tap(updated => console.log('Updated item:', updated))
    );
  }

  /**
   * 删除商品
   * @param name 要删除的商品名称
   * @returns 删除成功的消息
   */
  deleteItem(name: string): Observable<{ message: string }> {
    if (!name?.trim()) {
      return throwError(() => new Error('商品名称不能为空'));
    }

    if (name.toLowerCase() === 'laptop') {
      return throwError(() => new Error('禁止删除Laptop商品'));
    }

    if (this.useMock) {
      const deleted = this.mockData.deleteItemByName(name);
      if (!deleted) {
        return throwError(() => new Error('找不到要删除的商品'));
      }
      return of({ message: `模拟删除成功: ${name}` }).pipe(
        tap(() => console.log('Mock delete:', name))
      );
    }

    return this.http.delete<{ message: string }>(
      `${this.baseUrl}/${encodeURIComponent(name)}`,
      this.httpOptions
    ).pipe(
      catchError(this.handleError),
      tap(response => console.log('Delete response:', response))
    );
  }

  /**
   * 获取特色商品列表
   * @returns 特色商品数组的可观察对象
   */
  getFeaturedItems(): Observable<Item[]> {
    return this.getAllItems().pipe(
      map(items => items.filter(item => item.featuredItem === 1)),
      tap(featured => console.log('Featured items count:', featured.length))
    );
  }

  /**
   * 切换Mock模式
   * @param enabled 是否启用Mock模式
   */
  setMockMode(enabled: boolean): void {
    this.useMock = enabled;
    console.warn(`Mock模式已${enabled ? '启用' : '禁用'}`);
    if (enabled) {
      console.warn('警告: 当前使用模拟数据，不会与真实服务器交互');
    }
  }

  /**
   * 验证服务连接
   * @returns 可观察的验证结果
   */
  testConnection(): Observable<boolean> {
    return this.http.head(`${this.baseUrl}/`, {
      ...this.httpOptions,
      observe: 'response'
    }).pipe(
      map(response => response.status === 200),
      catchError(() => of(false))
    );
  }
}