import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import { Jwt } from '../models/Jwt';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  login(email: any, password: any){
    return this.httpClient.post<Jwt>(this.apiUrl + "/api/auth/login", {email, password});
  }

  register(username: any, email: any, phone: any, password: any){
    return this.httpClient.post<Jwt>(this.apiUrl + "/api/auth/register", {
      username,
      email,
      phone,
      password
    })
  }

  setSession(jwt: Jwt) {
    const expiresAt = moment().add(jwt.expiresIn,'second');
    localStorage.setItem('JWT', jwt.jwt);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    localStorage.setItem('username', jwt.username),
    localStorage.setItem('userId', JSON.stringify(jwt.userId)),
    localStorage.setItem('roleId', JSON.stringify(jwt.roleId))
  }
  
  logout() {
    localStorage.removeItem("JWT");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("roleId");
  }

  isLoggedIn() {
      return moment().isBefore(this.getExpiration()) && (localStorage.getItem('JWT') != undefined);
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");

    if(!expiration) return 0;

    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
