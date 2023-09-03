import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Machine } from 'src/app/model/machine.mode';
import { MachineService } from 'src/app/service/machine.service';
import { WebSocketService } from 'src/app/service/web-socket.service';

export enum Status {
  RUNNING = 'RUNNING',
  STOPPED = 'STOPPED'
}

export enum Operation{
  START = 'START',
  STOP = 'STOP',
  RESTART = 'RESTART',
  DESTROY = 'DESTROY',
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
  searchMachineForm!: FormGroup
  date: Date | undefined;
  scheduleDates: { [id: string]: Date } = {};

  
  statuses: any[] | undefined;

  selectedCity: any | undefined;

  constructor(
    private fb: FormBuilder, 
    private machineService: MachineService, 
    private messageService: MessageService, 
    private webSocketService: WebSocketService) {
      
     }

  ngOnInit() {

    this.initSearchForm();
    this.initSocket();
    this.initMachines();
    
    this.statuses = [
      { name: Status.RUNNING },
      { name: Status.STOPPED}
      
  ];

  }

  startMachine(machine: Machine) {

    if(this.scheduleDates[machine.id] != undefined){
      this.schedule(machine,this.scheduleDates[machine.id], Operation.START)
      return
    }
    
    this.machineService.startMachine(machine.id).subscribe({
      next: res => {
        if(res.status == 200){
          this.alertSuccessMsg(Operation.START)
        }
      }, error: err => {
        this.handleError(err)
      }
    })
  }

  stopMachine(machine: Machine) {

    if(this.scheduleDates[machine.id] != undefined){
      this.schedule(machine,this.scheduleDates[machine.id], Operation.STOP)
      return
    }

    this.machineService.stopMachine(machine.id).subscribe({
      next: res => {
        if(res.status == 200){
          this.alertSuccessMsg(Operation.STOP)
        }
      }, error: err => {
        this.handleError(err)
      }
    })
  }

  restartMachine(machine: Machine) {

    if(this.scheduleDates[machine.id] != undefined){
      this.schedule(machine,this.scheduleDates[machine.id], Operation.RESTART)
      return
    }

    this.machineService.restartMachine(machine.id).subscribe({
      next: res => {
        if(res.status == 200){
          this.alertSuccessMsg(Operation.RESTART)
        }
      }, error: err => {
        this.handleError(err)
      }
    })
  }

  destroyMachine(machine: Machine) {
    this.machineService.destroyMachine(machine.id).subscribe({
      next: res => {
        if (res.status == 200) {
          this.alertSuccessMsg(Operation.DESTROY)
          const index = this.machines.findIndex(m => m.id === machine.id);
          if (index !== -1) {
            this.machines[index].active = false;
          }
        }
      }, error: err => {
        this.handleError(err)
      }
    })
  }


  handleError(err: any){
    if(err.status == 409){
      this.alertMsg()
      return
    }
    if(err.status = 403){
      this.authAlert()
    }
  }

  alertMsg() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Cannot perform the action while machine is in this state' });
  }

  alertSuccessMsg(operation: string){
    this.messageService.add({ severity: 'success', summary: 'Success', detail: `The ${operation} task was succesfully launched` });
  }

  authAlert(){
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'You are not authorized to perform this task' });
  }

  initSocket(){
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
  }

  initMachines(){
    this.machineService.getAll().subscribe({
      next: val => {
        this.machines = val;
      }, error: err => {
        console.log(err)
      }
    })
  }

  initSearchForm(){
    this.searchMachineForm = this.fb.group({
      'name': [''],
      'status': [''],
      'dateFrom': [''],
      'dateTo': ['']
    });

  }

  onSubmitSearch(){

    const name = this.searchMachineForm.get('name')?.value;
    const dateFrom = this.formatDate(this.searchMachineForm.get('dateFrom')?.value);
    const dateTo = this.formatDate(this.searchMachineForm.get('dateTo')?.value);
    const statusObject = this.searchMachineForm.get('status')?.value;
    const statusValue = statusObject ? statusObject.name : null;    

    this.machineService.filterMachines(name, statusValue, dateFrom, dateTo).subscribe({
      next: val => {
        this.machines = val
      }, error: err => {
        this.handleError(err)
      }
    })
    
  }

  onDateChange(machineId: string, newDate: Date) {
    this.scheduleDates[machineId] = newDate;
  }

  formatDate(date: Date){
    if (date instanceof Date) {
      return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`;
    }
    return '';
  };

  
  schedule(machine: Machine, date: Date, operation: string){

    console.log(date);
    
    this.machineService.scheduleTask(machine.id, date, operation).subscribe({
      next: val => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Succesfully scheduled task' });
      }, error: err => {
        console.log(err);
      }
    })
  }

}
