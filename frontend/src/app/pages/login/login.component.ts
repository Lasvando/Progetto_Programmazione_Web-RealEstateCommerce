import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {
  jwt: string | undefined = undefined
  loginForm = new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  })
  failedLogin: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {

  }

  get email() {return this.loginForm.get('email')}
  get password() {return this.loginForm.get('password')}

  login(){
    this.authService.login(this.email?.value, this.password?.value).subscribe({
      next: jwt => {
        console.log("User is logged in");
        this.authService.setSession(jwt)
        this.router.navigateByUrl('/');
      },
      error: err => {
        console.log(err)
        this.failedLogin = true
      }
    });
  }
}
