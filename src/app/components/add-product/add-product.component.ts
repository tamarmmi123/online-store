import { Component, Inject } from '@angular/core';
import { Category } from '../../classes/category';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../classes/product';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-add-product',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, NgFor],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
newProduct: Product = {
    id: 0, // server generates ID
    productName: '',
    categoryId: 0,
    description: '',
    cost: 0,
    qtyInStock: 0,
    imgSource: ''
  };

  categories: Category[] = [];

  constructor(
    private dialogRef: MatDialogRef<AddProductComponent>,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe(cats => {
      this.categories = cats;
    });
  }

  addProduct() {
    this.productService.addProduct(this.newProduct).subscribe({
      next: () => {
        console.log('Product added successfully');
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Error adding product:', err);
      }
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
