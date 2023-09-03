import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private baseUrl: string = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) { }

  login(userData: { username: string, password: string }): Observable<any> {

    return this.http.post(`${this.baseUrl}/authenticate`, userData);
  }

  register(userData: { firstname: string, lastname: string, username: string, password: string, email: string}): Observable<any> {
    const roles: String[] = [
      "CAN_CREATE_USERS", 
      "CAN_UPDATE_USERS", 
      "CAN_DELETE_USERS", 
      "CAN_READ_USERS",
      "CAN_CREATE_MACHINES", 
      "CAN_RESTART_MACHINES", 
      "CAN_START_MACHINES", 
      "CAN_DESTROY_MACHINES", 
      "CAN_STOP_MACHINES", 
      "CAN_SEARCH_MACHINES"
  ];
  
    const user = {...userData, roles};
    return this.http.post(`${this.baseUrl}/register`, user);
  }
}
