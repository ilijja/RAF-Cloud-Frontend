import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MachineService } from 'src/app/service/machine.service';

@Component({
  selector: 'app-create-machine',
  templateUrl: './create-machine.component.html',
  styleUrls: ['./create-machine.component.css']
})
export class CreateMachineComponent {

  addMachineForm!: FormGroup

  constructor(private fb: FormBuilder, private machineService: MachineService){}

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
          console.log(err)
        }
      })
    }
  }
  

}
