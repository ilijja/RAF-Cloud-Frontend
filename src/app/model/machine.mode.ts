import { User } from "./user.model";

export interface Machine{
    id: number,
    name: string,
    status: string,
    user: number,
    active: boolean,
}


export interface ErrorAlert {
    id: number;
    createdBy: User;  
    machine: Machine;  
    creationDate: string; 
    errorDescription: string;
    machineOperation: string; 
  }