import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { User } from "../../classes/user";
import { UserService } from "../../services/user.service";
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UpdateErrorDialogComponent } from '../update-error-dialog/update-error-dialog.component';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  editableUser: User | null = null;
  showForm = true;
  private userSub!: Subscription;

  constructor(private route: ActivatedRoute, public user: UserService, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.user.getUserById(+id).subscribe({
        next: (u) => {
          this.editableUser = u;
        },
        error: (err) => {
          console.error('Failed to load user:', err);
        }
      });
    }
  }

  ngOnDestroy() {
    this.userSub?.unsubscribe();
  }

  logout() {
    this.user.logout();
  }

  onUpdate() {
    if (this.editableUser) {
      this.user.updateUser(this.editableUser).subscribe({
        next: (updatedUser) => {
          this.user.setCurrentUser(updatedUser);
          alert('Profile updated!');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err);
          this.dialog.open(UpdateErrorDialogComponent);
        }
      });
    }
  }

//   onUpdate() {
//   if (this.editableUser) {
//     console.log('About to update user:', this.editableUser);
//     this.user.updateUser(this.editableUser).subscribe({
//       next: (res) => console.log('Update success:', res),
//       error: (err) => console.error('Update error:', err),
//       complete: () => console.log('Update request completed')
//     });
//   }
// }
}