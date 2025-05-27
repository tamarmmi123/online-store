import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../classes/user';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, NgIf],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
  user: User = new User(0, '', '', '', '', '', '', '', [], 'user');
  hide = signal(true);
  errorMessage = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

   login(){
    this.router.navigate(['/login']);
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      this.errorMessage = 'Please fill in all required fields with valid data.';
      return;
    }

    this.userService.register(this.user).subscribe({
      next: (user) => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        if (err.status === 409) {
          this.errorMessage = 'Username already exists. Please choose another one.';
        } else {
          this.errorMessage = 'Registration failed. Please try again.';
        }
      }
    });
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
