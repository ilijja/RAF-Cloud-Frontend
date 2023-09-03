import { Component } from '@angular/core';
import { ErrorAlert, Machine } from 'src/app/model/machine.mode';
import { MachineService } from 'src/app/service/machine.service';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent {

  errors!: ErrorAlert[]

  constructor(private machineService: MachineService){}

  ngOnInit(){

    console.log("ide");
    
    this.machineService.getAllErrors().subscribe({
      next: val => {
        console.log("ide");
        
        console.log(val);
        this.errors = val;
      }, error: err => {
        console.log(err);
      }
    })

  }

}
