import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h1 mat-dialog-title>Confirm Logout</h1>
    <div mat-dialog-content>Are you sure you want to log out?</div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()">No</button>
      <button mat-button color="warn" (click)="onConfirm()">Yes</button>
    </div>
  `,
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: 'confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
