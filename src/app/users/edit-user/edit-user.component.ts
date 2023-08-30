import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { UsersService } from '../../service/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  editUserForm!: FormGroup;
  user: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UsersService,
    private router: Router,
    private fb: FormBuilder  
  ) { 
    this.editUserForm = this.fb.group({
      'firstname': ['', Validators.required],
      'lastname': ['', Validators.required],
      'email': ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    
    this.userService.getById(id).subscribe({
      next: val => {
        this.user = val
        this.initializeForm()
      }, error: err => {
        console.log(err);
      }
    })
  }

  initializeForm(): void {
    this.editUserForm = new FormGroup({
      'firstname': new FormControl(this.user.firstname, [Validators.required]),
      'lastname': new FormControl(this.user.lastname, [Validators.required]),
      'email': new FormControl(this.user.email, [Validators.required]),
    });
  }


  onSubmit() {
    this.userService.update(this.user.id, this.editUserForm.value).subscribe({
      next: val => {
        alert("Succesfully updated user")
      }, error: err => {
        console.log(err)
      }
    })
  }


}