import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import { Property } from '../models/Property';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  get(id: number) {
    return this.http.get<Property>(this.apiUrl + "/api/property/" + id);
  }

  getAll() {
    return this.http.get<Property[]>(this.apiUrl + "/api/property");
  }
}
