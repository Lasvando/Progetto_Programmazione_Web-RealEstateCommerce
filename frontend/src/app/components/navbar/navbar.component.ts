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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(){
    this.logged = this.authService.isLoggedIn()
    this.username = localStorage.getItem('username')  
  }

  logout(){
    this.authService.logout()

    this.logged = false
  }
}