// user-list.component.ts

import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../service/users.service';
import { User, Role } from '../../model/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UsersService) {}

  ngOnInit(){
    this.userService.getAll().subscribe({
      next: users => {
        this.users = users;
        console.log(users);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  getRoles(user: User): string {
    return user.roles.map(role => role.permissionName).join(', ');
  }


  deleteUser(id: number){
    this.userService.delete(id).subscribe({
      next: val => {
        this.users = this.users.filter(user => user.id !== id);
      },error: err => {
        console.log(err)
      }
    })
  }
  

}
