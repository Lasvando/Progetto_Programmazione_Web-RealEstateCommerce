import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Role } from 'src/app/models/Role';
import { AuthService } from 'src/app/service/auth.service';
import { RoleService } from 'src/app/service/role.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  roles: Role[] | undefined = undefined
  passwordCheck : boolean | undefined = undefined
  httpError: boolean = false
  httpErrorMsg: string[] | undefined = undefined

  registerForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmPassword: new FormControl('',[
      Validators.required,
    ]),
    phone: new FormControl('',[
      Validators.required
    ])
  })

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
  }

  get username(){
    return this.registerForm.get('username')
  }

  get email(){
    return this.registerForm.get('email')
  }

  get password(){
    return this.registerForm.get('password')
  }

  get confirmPassword(){
    return this.registerForm.get('confirmPassword')
  }

  get phone(){
    return this.registerForm.get('phone')
  }

  register(){
    if(this.registerForm.invalid){
      alert("Inserire i dati richiesti")
      return;
    }

    if(this.password?.value !== this.confirmPassword?.value){
      this.passwordCheck = false;
      return
    }

    this.authService.register(
      this.username?.value, 
      this.email?.value, 
      this.phone?.value, 
      this.password?.value).subscribe({
        next: jwt => {
          console.log("User is logged in");
          this.authService.setSession(jwt)
          this.router.navigateByUrl('/');
        },
        error: err => { 
          this.httpErrorMsg = [];
          console.log(err);
          this.httpError = true;
          if((err.error.errors) instanceof Array){
            (err.error.errors).forEach((errorMsg: any) => {
              console.log(this.httpErrorMsg);
                this.httpErrorMsg?.push(errorMsg.msg)
            });
          }else if((err.error.errors.errors) instanceof Array){
            (err.error.errors.errors).forEach((errorMsg: any) => {
              console.log(this.httpErrorMsg);
                this.httpErrorMsg?.push(errorMsg.message)
            });
          }
        }
      })
  }
}
