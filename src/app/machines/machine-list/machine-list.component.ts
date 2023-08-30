import { CSP_NONCE, Component } from '@angular/core';
import { Machine } from 'src/app/model/machine.mode';
import { MachineService } from 'src/app/service/machine.service';

@Component({
  selector: 'app-machine-list',
  templateUrl: './machine-list.component.html',
  styleUrls: ['./machine-list.component.css']
})
export class MachineListComponent {

  machines!: Machine[]

  constructor(private machineService: MachineService){}

  ngOnInit(){
    this.machineService.getAll().subscribe({
      next: val => {
        this.machines = val;
      }, error: err => {
        console.log(err)
      }
    })
  }

  startMachine(id: number){
    this.machineService.startMachine(id).subscribe({
      next: res => {
        console.log(res.status);
      }, error: err => {
        console.log(err);
        
      }
    })
  }

  stopMachine(id: number){
    this.machineService.stopMachine(id).subscribe({
      next: res => {
        console.log(res.status);
      }, error: err => {
        console.log(err);
        
      }
    })
  }

  restartMachine(id: number){
    this.machineService.restartMachine(id).subscribe({
      next: res => {
        console.log(res.status);
      }, error: err => {
        console.log(err);
        
      }
    })
  }

  destroyMachine(id: number){
    this.machineService.destroyMachine(id).subscribe({
      next: res => {
        console.log(res.status);
      }, error: err => {
        console.log(err);
        
      }
    })
  }


}
