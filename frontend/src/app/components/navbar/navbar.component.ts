import { Component, OnInit } from '@angular/core';
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit{
  faCircleUser : IconDefinition = faCircleUser;
  logged : boolean = false;
  isCollapsed : boolean = true;
  username: string | null = null
  roleId: any = null

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(){
    this.logged = this.authService.isLoggedIn()
    this.username = localStorage.getItem('username')
    this.roleId = localStorage.getItem('roleId')  
  }

  logout(){
    this.authService.logout()

    this.logged = false
  }
}