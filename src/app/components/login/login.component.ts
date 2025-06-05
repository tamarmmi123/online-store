import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../services/user.service';
import { NgIf } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgIf,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  userName: string = '';
  password: string = '';
  hide = signal(true);
  errorMessage = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) { }


  onSubmit(form: NgForm) {
    if (!form.valid) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    this.userService.login(this.userName, this.password).subscribe({
      next: (user) => {
        const token = localStorage.getItem('token');
        if (token) {
          const decoded: any = jwtDecode(token);
          const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];          

          if (role === 'manager') {
            this.router.navigate(['/categories']);
          } else {
            this.router.navigate(['/products']);
          }
        }
      },
      error: () => {
        this.errorMessage = 'Invalid username or password';
      }
    });
  }

  register(){
    this.router.navigate(['/register']);
  }


  togglePassword(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}