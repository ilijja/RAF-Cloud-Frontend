import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorAlert, Machine } from '../model/machine.mode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class MachineService {

  private baseUrl: string = 'http://localhost:8080/api/machine';
  private errorUrl: string = 'http://localhost:8080/api/error';

  constructor(private http: HttpClient) {
    
  }

  getAll(): Observable<Machine[]> {
    return this.http.get<Machine[]>(`${this.baseUrl}/getAll`, {headers: this.getHeaders()});
  }

  getAllErrors(): Observable<ErrorAlert[]> {
    return this.http.get<ErrorAlert[]>(`${this.errorUrl}/getAll`, {headers: this.getHeaders()});
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

  filterMachines(name: string, status: string, dateFrom: string, dateTo: string) {
    let params = new HttpParams();

    if (name !== null && name !== undefined) {
        params = params.append('name', name);
    }
    if (status !== null && status !== undefined) {
        params = params.append('status', status);
    }
    if (dateFrom !== null && dateFrom !== undefined) {
        params = params.append('dateFrom', dateFrom);
    }
    if (dateTo !== null && dateTo !== undefined) {
        params = params.append('dateTo', dateTo);
    }

    return this.http.get<any>(`${this.baseUrl}/search`, { params: params, headers: this.getHeaders() });
  }

  scheduleTask(id: number, date: Date, operation: string){
    const scheduleParams: any = {
      'id': id,
      'date': date,
      'operation': operation,
    }

    return this.http.post<any>(`${this.baseUrl}/schedule`, scheduleParams, {headers: this.getHeaders()} )
  }

 getHeaders(){
    return new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
        .set('Authorization', `Bearer ${localStorage.getItem("token")}` )
  }

}
