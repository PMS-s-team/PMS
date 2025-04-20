// edit.page.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { IonicModule } from '@ionic/angular'; // 使用正确的模块名称
import { ReactiveFormsModule } from '@angular/forms'; // 导入 ReactiveFormsModule

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule] // 在这里导入 ReactiveFormsModule
})
export class EditPage implements OnInit {
  editForm: FormGroup;
  itemId: string = ''; // 初始化为空字符串

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      price: [0, [Validators.required, Validators.min(0)]],
      supplier: ['', [Validators.required]],
      stockStatus: ['', [Validators.required]],
      featured: [false], // 修改为布尔值
      specialNote: [''],
    });
  }

  ngOnInit() {
    this.itemId = this.route.snapshot.paramMap.get('id') || ''; // 防止返回 null
    this.loadItemData();
  }

  loadItemData() {
    if (this.itemId && this.itemId.trim() !== '') { // 额外检查非空字符串
      this.apiService.getItemById(this.itemId).subscribe(
        (item) => {
          if (item) {
            this.editForm.patchValue(item);
          } else {
            console.error('未找到对应的商品数据');
          }
        },
        (error) => {
          console.error('加载商品数据失败:', error);
        }
      );
    } else {
      console.error('ItemId 无效或为空');
    }
  }

  onSubmit() {
    if (this.editForm.valid && this.itemId && this.itemId.trim() !== '') { // 确保 itemId 和表单有效
      this.apiService.updateItem(this.itemId, this.editForm.value).subscribe(
        () => {
          alert('商品更新成功！');
          this.router.navigate(['/tabs/list']);
        },
        (error) => {
          alert('商品更新失败，请重试！');
          console.error('更新商品失败:', error);
        }
      );
    } else {
      alert('请填写所有必填字段或检查 ItemId！');
    }
  }
}