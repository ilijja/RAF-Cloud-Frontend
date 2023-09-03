import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { MachineService } from 'src/app/service/machine.service';

@Component({
  selector: 'app-create-machine',
  templateUrl: './create-machine.component.html',
  styleUrls: ['./create-machine.component.css']
})
export class CreateMachineComponent {

  addMachineForm!: FormGroup

  constructor(private fb: FormBuilder, private machineService: MachineService, private messageService: MessageService ){}

  ngOnInit(){
    this.addMachineForm = this.fb.group({
      'name': ['', Validators.required],
    });
  }

  onSubmit(){
    if(this.addMachineForm.valid){
      const name = this.addMachineForm.get('name')?.value;
      this.machineService.addMachine(name).subscribe({
        next: val => {
          console.log(val)
        }, error: err => {
          this.handleError(err)
        }
      })
    }
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

}
