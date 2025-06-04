import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../classes/user';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Category } from '../../classes/category';
import { EditCategoryDialogComponent } from '../edit-category-dialog/edit-category-dialog.component';


@Component({
  selector: 'app-edit-user-dialog',
  imports: [MatFormField, MatLabel, MatSelect, MatOption, MatDialogActions, MatDialogContent, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './edit-user-dialog.component.html',
  styleUrl: './edit-user-dialog.component.scss'
})
export class EditUserDialogComponent {
  editForm: FormGroup;

  constructor(
  @Inject(MAT_DIALOG_DATA) public category: Category,
  public dialogRef: MatDialogRef<EditCategoryDialogComponent>,
  private fb: FormBuilder
) {
  this.editForm = this.fb.group({
    name: [category.name, Validators.required]
  });
}

  save(): void {
  const updated = { ...this.category, ...this.editForm.value };
  this.dialogRef.close(updated);
}
}
