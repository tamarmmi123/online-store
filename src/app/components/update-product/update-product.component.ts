import { Component, Inject } from '@angular/core';
import { Product } from '../../classes/product';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { NgFor } from '@angular/common';
import { Category } from '../../classes/category';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-update-product',
  imports: [MatFormField, MatLabel, FormsModule, MatOption, NgFor, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent {
  editableProduct: Product;
  categories: Category[] = [];

  constructor(private productService: ProductService,
    private dialogRef: MatDialogRef<UpdateProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product, categories: Category[] }
  ) {
    this.editableProduct = { ...data.product };
    this.categories = data.categories;
  }

  onUpdate() {
    this.productService.updateProduct(this.editableProduct).subscribe({
      next: () => {
        console.log('Product updated successfully');
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Error updating product:', err);
        this.dialogRef.close(false);
      }
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
