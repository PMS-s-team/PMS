import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; // 导入 IonicModule
import { ApiService } from '../../services/api.service';
import { Item, Category, StockStatus } from '../../models/item.model';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
  standalone: true,
  imports: [
    IonicModule, // 只保留 IonicModule
    CommonModule,
    FormsModule
  ]
})
export class AddPage implements OnInit {
  // 初始化新商品对象，使用默认值
  newItem: Omit<Item, 'id'> = {
    name: '',
    category: Category.Electronics,
    quantity: 0,
    price: 0,
    supplierName: '',
    stockStatus: StockStatus.InStock,
    featuredItem: 0,
    specialNote: ''
  };

  constructor(
    private api: ApiService, 
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    // 初始化逻辑可以在这里添加
  }

  // 表单提交方法
  async onSubmit(form: NgForm) {
    // 简单的客户端表单验证
    if (!this.newItem.name || this.newItem.quantity < 0 || this.newItem.price < 0) {
      const toast = await this.toastCtrl.create({
        message: '请确保商品名称、库存数量和价格填写正确',
        duration: 2000,
        position: 'top'
      });
      await toast.present();
      return;
    }

    try {
      // 调用 API 服务添加商品
      const addedItem = await this.api.addItem(this.newItem).toPromise();

      // 检查服务器返回的数据是否有效
      if (!addedItem) {
        throw new Error('添加商品失败，服务器未返回有效数据');
      }

      // 显示成功提示
      const toast = await this.toastCtrl.create({
        message: `商品 ${addedItem.name ?? '未知'} 已成功添加`,
        duration: 2000,
        position: 'top'
      });
      await toast.present();

      // 重置表单
      this.resetForm(form);
    } catch (err) {
      // 打印错误信息以便调试
      console.error('添加商品时出错:', err);
      // 显示错误提示
      const toast = await this.toastCtrl.create({
        message: '添加商品失败，请稍后重试',
        duration: 2000,
        position: 'top'
      });
      await toast.present();
    }
  }

  // 重置表单方法
  resetForm(form: NgForm) {
    form.resetForm();
    this.newItem = {
      name: '',
      category: Category.Electronics,
      quantity: 0,
      price: 0,
      supplierName: '',
      stockStatus: StockStatus.InStock,
      featuredItem: 0,
      specialNote: ''
    };
  }

  // 定义 showHelp 方法
  async showHelp() {
    const alert = await this.alertCtrl.create({
      header: '帮助',
      message: `
        <p>在此页面，您可以添加新商品。</p>
        <ul>
          <li><strong>商品名称：</strong>请输入商品的名称。</li>
          <li><strong>分类：</strong>选择商品的分类（如电子产品、家具等）。</li>
          <li><strong>库存数量：</strong>输入商品的库存数量，必须为非负整数。</li>
          <li><strong>价格：</strong>输入商品的价格，必须为非负整数。</li>
          <li><strong>供应商：</strong>输入供应商的名称。</li>
          <li><strong>库存状态：</strong>选择商品的库存状态（如有库存、库存不足等）。</li>
          <li><strong>备注：</strong>可选，输入商品的附加信息。</li>
        </ul>
      `,
      buttons: ['确定']
    });
    await alert.present();
  }
}