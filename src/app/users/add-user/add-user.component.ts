import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../service/users.service';
import { NewUser } from '../../model/user.model';

interface Role {
  name: string,
  code: string
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addUserForm!: FormGroup;
  roles!: Role[];
  selectedRoles!: Role[];

  constructor(private fb: FormBuilder, private userService: UsersService) {
  }

  ngOnInit(): void {
    
    this.roles = [
      { name: 'Can Read Users', code: 'CAN_READ_USERS' },
      { name: 'Can Create Users', code: 'CAN_CREATE_USERS' },
      { name: 'Can Delete Users', code: 'CAN_DELETE_USERS' },
      { name: 'Can Update Users', code: 'CAN_UPDATE_USERS' },

      { name: 'Can Create Machines', code: 'CAN_CREATE_MACHINES' },
      { name: 'Can Start Machines', code: 'CAN_START_MACHINES' },
      { name: 'Can Restart Machines', code: 'CAN_RESTART_MACHINES' },
      { name: 'Can Search Machines', code: 'CAN_SEARCH_MACHINES' },
      { name: 'Can Destroy Machines', code: 'CAN_DESTROY_MACHINES' },
      { name: 'Can Stop Machines', code: 'CAN_STOP_MACHINES' },
    ];

    
    this.addUserForm = this.fb.group({
      'firstname': ['', Validators.required],
      'lastname': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email]],
      'username': ['', Validators.required],
      'password': ['', Validators.required],
      'roles': [this.selectedRoles] 
    });
    
    
  }

  onSubmit() {
    if (this.addUserForm.valid) {
      const user : NewUser = {
        ...this.addUserForm.value,
        roles: this.addUserForm.value.roles.map((role: { code: any; }) => role.code) 
      };
      
      
      this.userService.create(user).subscribe({
        next: val => {
          console.log(val)
        },error: err => {
          console.log(err)
        }
      })
    }
  }
}
