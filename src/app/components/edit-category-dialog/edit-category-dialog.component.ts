import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../classes/category';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-edit-category-dialog',
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './edit-category-dialog.component.html',
  styleUrl: './edit-category-dialog.component.scss'
})
export class EditCategoryDialogComponent {
  editForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public category: Category,
    private dialogRef: MatDialogRef<EditCategoryDialogComponent>,
    private fb: FormBuilder
  ) {

    this.editForm = this.fb.group({
      name: [this.category.name, Validators.required]
    });

  }

  save(): void {
    const newCategory: Category = {
      ...this.category,
      ...this.editForm.value
    };

    this.dialogRef.close(newCategory);
  }

}
