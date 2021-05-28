import { AuthGuardService } from './../services/auth/auth-guard.service';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Login} from '../models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  mForm: FormGroup
  isSent = false
  errorUsername = false
  errorPass = false

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private guardService: AuthGuardService) {

      this.mForm = this.fb.group({
        username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z_\-.][a-zA-Z0-9_\-.]+[a-zA-Z0-9_\-.]$/)]],
        password: ['', [Validators.required, Validators.pattern(/^[a-zA-z][a-z0-9]+[a-z0-9]$/)]]
      })

     }

  ngOnInit(): void {
    if(this.guardService.canActivate()){
      const username = localStorage.getItem("username")
      if(username) {
        this.router.navigate(['/'+username])
      }
    }
  }

  get f() {
    return this.mForm.controls
  }

  setErrors(error: any){

    if(error.error == "wrong password"){
      this.errorPass = true
    } else if(error.error == "wrong username"){
      this.errorUsername = true
    }

    console.log(this.errorUsername)
    console.log(this.errorPass)

  }

  onSubmit() {

    this.isSent = true

    console.log("Enviar form");

    if (this.mForm.invalid) {
      return
    }
    /*Hacer llamada al service
    Hacer dos servicios: user, people
    llamar al servicio de login y en la respuesta guardar en el localStorage el token y redirigir al DASHBOARD
    */

    const login: Login = new Login()
    login.username = this.f.username?.value
    login.password = this.f.password?.value
    this.userService.login(login).subscribe((data: any) => {
      localStorage.setItem("token",data.access_token)
      localStorage.setItem("username",data.data.username)
      this.router.navigate([`/${data.data.username}`])
      console.log(data)
    },
      error => {
        console.log("Error:", error);
        this.setErrors(error)
      }
    )
  }





}
