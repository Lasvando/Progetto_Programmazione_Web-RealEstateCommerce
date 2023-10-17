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
  passwordCheck : boolean | undefined = undefined;

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
    roleId: new FormControl('', [
      Validators.required
    ]),
    phone: new FormControl('',[
      Validators.required
    ])
  })

  constructor(private authService: AuthService, private roleService: RoleService, private router: Router) {}

  ngOnInit(): void {
    this.roleService.getAll().subscribe({
      next: roles => this.roles = roles,
      error: err => console.log(err)
    })
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

  get roleId(){
    return this.registerForm.get('roleId')
  }

  register(){
    if(this.password?.value !== this.confirmPassword?.value){
      this.passwordCheck = false;
      return
    }

    this.authService.register(
      this.username?.value, 
      this.email?.value, 
      this.phone?.value, 
      this.roleId?.value, 
      this.password?.value).subscribe({
        next: jwt => {
          console.log("User is logged in");
          this.authService.setSession(jwt)
          this.router.navigateByUrl('/');
        },
        error: err => console.log(err)
      })
  }
}
