import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatIcon } from '@angular/material/icon';
import { MatMenuTrigger, MatMenu } from '@angular/material/menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [MatIcon, MatMenuTrigger, MatMenu]
})
export class MenuComponent {
  isManager: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
  this.userService.currentUser$.subscribe(user => {
    this.isManager = user?.role === 'manager';
  });
}

  addUser() { /* ... */ }
  updateUser() { /* ... */ }
  deleteUser() { /* ... */ }
  addCategory() { /* ... */ }
  updateCategory() { /* ... */ }
}
