import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';  


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData = {
    username: '',
    password: ''
  };

  registerData = {
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    email: ''
  };

  constructor(private authService: AuthService, private router: Router) { }


  onLoginSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      
      this.authService.login(this.loginData).subscribe({
        next: val => {
          this.save(val)          
        },
        error: err => {
          console.log(err);
        }
      })

    }
  }

  onRegisterSubmit(registerForm: NgForm) {
    if (registerForm.valid) {
      this.authService.register(this.registerData).subscribe({
        next: val => {
          this.save(val)
        },
        error: err => {
          console.log(err);
        }
      })
    }
  }

  save(val: any){
    console.log("token check 1:" + val.access_token)
    localStorage.removeItem("token")
    localStorage.setItem("token", val.access_token)
    this.router.navigate(['/users']);
  }

  



}
