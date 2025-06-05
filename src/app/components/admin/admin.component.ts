import { Component, ViewChild } from '@angular/core';
import { User } from '../../classes/user';
import { UserService } from '../../services/user.service';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-admin',
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatIconModule, MatButtonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  displayedColumns: string[] = ['id', 'userName', 'email', 'actions'];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public userService: UserService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.userService.isManager()) {
      this.userService.getAllUsers().subscribe(users => {
        this.dataSource.data = users;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    } else {
      this.router.navigate(['/not-found']);
    }
  }

  // editUser(userId: number): void {
  //   const user = this.dataSource.data.find(u => u.id === userId);
  //   if (!user) return;

  //   const dialogRef = this.dialog.open(EditUserDialogComponent, {
  //     width: '400px',
  //     data: user
  //   });

  //   dialogRef.afterClosed().subscribe((result: User | undefined) => {
  //     if (result) {
  //       this.userService.updateUser(result).subscribe(updated => {
  //         Object.assign(user, updated); // update local table data
  //       });
  //     }
  //   });
  // }

  deleteUser(id: number): void {
  //   if (!confirm('Are you sure you want to delete this user?')) return;

  //   this.userService.deleteUser(id).subscribe(() => {
  //     this.dataSource.data = this.dataSource.data.filter(user => user.id !== id);
  //   });
  // }

  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Confirm Deletion',
          message: `Are you sure you want to delete user?`
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.userService.deleteUser(id).subscribe({
            next: () => {
              console.log(`User with ID ${id} deleted successfully`);
              // this.productDeleted.emit(id);
            },
            error: (err) => {
              console.error('Error deleting user:', err);
              this.dialog.open(ConfirmDialogComponent, {
                data: {
                  title: 'Delete Failed',
                  message: 'An error occurred while deleting the user. Please try again.'
                }
              });
            }
          });
        }
      });
}


}
