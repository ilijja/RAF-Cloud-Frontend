import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewUser, UpdatingUser, User } from '../model/user.model';


@Injectable({
  providedIn: 'root'
})
export class UsersService {


  private baseUrl: string = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {
    
  }


  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/getAll`, {headers: this.getHeaders()});
  }

  delete(id: number){
    return this.http.delete(`${this.baseUrl}/delete/${id}`, {headers: this.getHeaders()});
  }

  update(id: number, user: any) {

    const updatingUser: UpdatingUser = {
      id: id,
      firstname: user.firstname, 
      lastname: user.lastname,   
      email: user.email,
    };

    return this.http.put(`${this.baseUrl}/update`, updatingUser, {headers: this.getHeaders()});
  }

  create(user: NewUser){
    return this.http.post(`${this.baseUrl}/add`, user, {headers: this.getHeaders()});
  }

  getById(id: number){
    

    return this.http.get<User[]>(`${this.baseUrl}/getById/${id}`, {headers: this.getHeaders()});
  }

  getHeaders(){
    return new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
        .set('Authorization', `Bearer ${localStorage.getItem("token")}` )
  }
}
