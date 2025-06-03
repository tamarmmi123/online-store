import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-update-address-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './update-address-dialog.component.html',
  styleUrl: './update-address-dialog.component.scss'
})
export class UpdateAddressDialogComponent {
  address: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { address: string },
    private dialogRef: MatDialogRef<UpdateAddressDialogComponent>
  ) {
    this.address = data.address || '';
  }

  save(): void {
    this.dialogRef.close(this.address);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
