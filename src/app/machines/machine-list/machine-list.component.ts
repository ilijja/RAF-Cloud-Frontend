import { CSP_NONCE, Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Machine } from 'src/app/model/machine.mode';
import { MachineService } from 'src/app/service/machine.service';
import { WebSocketService } from 'src/app/service/web-socket.service';

export enum Status {
  RUNNING = 'RUNNING',
  STOPPED = 'STOPPED'
}

@Component({
  selector: 'app-machine-list',
  templateUrl: './machine-list.component.html',
  styleUrls: ['./machine-list.component.css']
})


export class MachineListComponent {

  machines!: Machine[]
  machineStatus: any;
  loading: boolean = false;

  constructor(private machineService: MachineService, private messageService: MessageService, private webSocketService: WebSocketService){}

  ngOnInit(){

    this.webSocketService.connect();
    this.webSocketService.machineStatus.subscribe((newMachine: any) => {
      this.loading = false;
      const index = this.machines.findIndex(machine => machine.id === newMachine.id);
      if (index !== -1) {
        this.machines.splice(index, 1, newMachine);
      } else {
        this.machines.push(newMachine);
      }
    });

    this.machineService.getAll().subscribe({
      next: val => {
        this.machines = val;
      }, error: err => {
        console.log(err)
      }
    })
  }

  startMachine(machine: Machine){

    if(machine.status != Status.STOPPED){
      console.log('asd');
      this.alertMsg()
      return
    }

    // this.loading = true
    this.machineService.startMachine(machine.id).subscribe({
      next: res => {
        console.log(res.status);
      }, error: err => {
        console.log(err);
        
      }
    })
  }

  stopMachine(machine: Machine){

    if(machine.status != Status.RUNNING){
      
      
      this.alertMsg()
      return
    }


    // this.loading = true
    this.machineService.stopMachine(machine.id).subscribe({
      next: res => {
        console.log(res.status);
      }, error: err => {
        console.log(err);
        
      }
    })
  }

  restartMachine(machine: Machine){

    if(machine.status != Status.RUNNING){
      this.alertMsg()
      return
    }


    // this.loading = true
    this.machineService.restartMachine(machine.id).subscribe({
      next: res => {
        console.log(res.status);
      }, error: err => {
        console.log(err);
        
      }
    })
  }

  destroyMachine(machine: Machine){

    if(machine.status != Status.STOPPED){
      this.alertMsg()
      return
    }


    this.machineService.destroyMachine(machine.id).subscribe({
      next: res => {
        if(res.status == 200){
          const index = this.machines.findIndex(m => m.id === machine.id);
          if (index !== -1) {
            this.machines[index].active = false;
          }
        }
      }, error: err => {
        console.log(err);
      }
    })
  }


  alertMsg(){
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Cannot perform the action while machine is in this state' });
  }

}
