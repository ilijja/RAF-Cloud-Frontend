import { Injectable } from '@angular/core';
import { Client, Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private client: Client;
  public machineStatus: Subject<any> = new Subject();

  constructor() {
    this.client = Stomp.client('http://localhost:8080/machine-websocket');
    this.client.webSocketFactory = () => {
      return new SockJS(`http://localhost:8080/machine-websocket?jwt=${localStorage.getItem('token')}`);
    };
  }

  connect() {
    this.client.activate();
    this.client.onConnect = () => {
      this.client.subscribe('/topic/machine-status', (message) => {
        this.machineStatus.next(JSON.parse(message.body));
      });
    };
  }

  disconnect() {
    this.client.deactivate();
  }
}
