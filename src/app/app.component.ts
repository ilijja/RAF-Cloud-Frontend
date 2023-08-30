import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cloud-front';


  items: MenuItem[] | undefined;

    constructor(private router: Router){}

    ngOnInit() {
        this.items = [
            {
                label: 'Logout',
                icon: 'pi pi-fw pi-power-off',
                command: () => { this.logout() },
            },
            {
              label: 'Add Machine',
              icon: 'pi pi-fw pi-power-off',
              command: () => { this.addMachine() },
            },
            {
              label: 'My machines',
              icon: 'pi pi-fw pi-power-off',
              command: () => { this.myMachines() },
            }
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

}
