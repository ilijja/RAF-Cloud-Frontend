export interface User {
    id: number
    username: string
    email: string
    firstname: string
    lastname: string
    password: string
    roles: Role[]
  }

  export interface NewUser {
    username: string
    email: string
    firstname: string
    lastname: string
    password: string
    roles: Role[]
  }
  
  
  export interface Role {
    id: number
    permissionName: string
  }

  export interface UpdatingUser{
    id: number,
    firstname: string,
    lastname: string,
    email: string,
  }