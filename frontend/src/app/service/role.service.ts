import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import { Role } from '../models/Role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getAll(){
    return this.httpClient.get<Role[]>(this.apiUrl + "/api/role");
  }

  get(id: number){

  }
}
