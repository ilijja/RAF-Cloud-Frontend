import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Machine } from '../model/machine.mode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class MachineService {

  private baseUrl: string = 'http://localhost:8080/api/machine';

  constructor(private http: HttpClient) {
    
  }

  getAll(): Observable<Machine[]> {
    return this.http.get<Machine[]>(`${this.baseUrl}/getAll`, {headers: this.getHeaders()});
  }

  addMachine(name: string): Observable<any>{
    const body = {
      'name': name
    }
    
    return this.http.post<any>(`${this.baseUrl}/create`, body, {headers: this.getHeaders()});
  }

  destroyMachine(id: number): Observable<HttpResponse<any>>{
    return this.http.post<any>(`${this.baseUrl}/destroy/${id}` , {} ,{headers: this.getHeaders(), observe: 'response' });
  }

  restartMachine(id: number): Observable<HttpResponse<any>>{
    return this.http.post<any>(`${this.baseUrl}/restart/${id}` , {} ,{headers: this.getHeaders(), observe: 'response' });
  }

  startMachine(id: number): Observable<HttpResponse<any>>{
    return this.http.post<any>(`${this.baseUrl}/start/${id}`, {}, { headers: this.getHeaders(), observe: 'response' });
  }


  stopMachine(id: number): Observable<HttpResponse<any>>{
    return this.http.post<any>(`${this.baseUrl}/stop/${id}` , {} ,{headers: this.getHeaders(), observe: 'response' });
  }


  getHeaders(){
    return new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
        .set('Authorization', `Bearer ${localStorage.getItem("token")}` )
  }
}
