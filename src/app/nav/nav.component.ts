import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  items: MenuItem[] | undefined;

    constructor(private router: Router){}
    isUserLoggedIn = false;

    ngOnInit() {

      this.checkUserLoginStatus();
    
      this.items = [
          {
            label: 'Users',
            icon: 'pi pi-users',
            command: () => { this.users() },
          },
          {
            label: 'Add User',
            icon: 'pi pi-user-plus',
            command: () => { this.addUser() },
          },
          {
            label: 'Add Machine',
            icon: 'pi pi-plus-circle',
            command: () => { this.addMachine() },
          },
          {
            label: 'My machines',
            icon: 'pi pi-desktop',
            command: () => { this.myMachines() },
          },
          {
            label: 'Errors',
            icon: 'pi pi-exclamation-triangle',
            command: () => { this.error() },
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => { this.logout() },
        },
      ];
  }
  

    logout(){
      localStorage.removeItem("token")
      this.router.navigate(['/login'])
    }

    addMachine(){
      this.router.navigate(['/add-machine'])
    }

    myMachines(){
      this.router.navigate(['/machines'])
    }

    error(){
      this.router.navigate(['/errors'])
    }

    users(){
      this.router.navigate(['/users'])
    }

    addUser(){
      this.router.navigate(['/add-user'])
    }


    checkUserLoginStatus(): void {
      const token = localStorage.getItem('token');
      this.isUserLoggedIn = !!token;
    }

}
