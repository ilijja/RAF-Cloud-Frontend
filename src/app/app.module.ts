import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './users/user-list/user-list.component';  
import { EditUserComponent } from './users/edit-user/edit-user.component'; 
import { ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { ListboxModule } from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddUserComponent } from './users/add-user/add-user.component';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem, MessageService } from 'primeng/api';
import { AuthGuard } from './guards/auth.guard';
import { CreateMachineComponent } from './machines/create-machine/create-machine.component';
import { MachineListComponent } from './machines/machine-list/machine-list.component';
import { TableModule } from 'primeng/table';
import { WebSocketService } from './service/web-socket.service';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ErrorsComponent } from './machines/errors/errors.component';
import { NavComponent } from './nav/nav.component';

const routes: Routes = [
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'edit-user/:id', component: EditUserComponent, canActivate: [AuthGuard] },
  { path: 'add-user', component: AddUserComponent, canActivate: [AuthGuard] },
  { path: 'errors', component: ErrorsComponent, canActivate: [AuthGuard] },


];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserListComponent, 
    EditUserComponent, 
    AddUserComponent, CreateMachineComponent, MachineListComponent, ErrorsComponent, NavComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    MenubarModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MultiSelectModule,
    ListboxModule,
    ButtonModule,
    TableModule,
    ToastModule,
    CalendarModule,
    InputTextModule,
    DropdownModule
  ],
  providers: [WebSocketService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { 


}
