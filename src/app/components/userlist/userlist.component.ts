import { Component } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../../services/user.service';

@Component({
  templateUrl: './userlist.component.html',
})
export class UserListComponent {
  users: User[] = [];

  constructor(private userService: UserService) {
    userService.getAll().subscribe((users) => {
      this.users = users;
    });
  }

  ban(user: User) {
    console.log('test');

    this.userService.banOrUnban(user);
  }
}
