import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { AuthGuard } from './guards/auth.guard';
import { MachineListComponent } from './machines/machine-list/machine-list.component';
import { CreateMachineComponent } from './machines/create-machine/create-machine.component';
import { ExceptionComponent } from './machines/exception/exception.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent,  },
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'add-user', component: AddUserComponent, canActivate: [AuthGuard]},
  { path: 'machines', component: MachineListComponent, canActivate: [AuthGuard] },
  { path: 'add-machine', component: CreateMachineComponent, canActivate: [AuthGuard] },
  { path: 'errors', component: ExceptionComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
