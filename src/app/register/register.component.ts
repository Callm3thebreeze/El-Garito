import { AuthGuardService } from './../services/auth/auth-guard.service';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Register} from '../models/register.model';
import { cities } from '../models/citiesList';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  mForm: FormGroup
  isSent = false
  errorPass = false
  errorUsername = false
  errorName = false
  errorEmail = false
  citiesList: string[] = cities

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private guardService: AuthGuardService) {

      this.mForm = this.fb.group({
        username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z_\-.][a-zA-Z0-9_\-.]+[a-zA-Z0-9_\-.]$/)]],
        password: ['', [Validators.required, Validators.pattern(/^[a-zA-z][a-z0-9]+[a-z0-9]$/)]],
        confirm_password: ['', [Validators.required, Validators.pattern(/^[a-zA-z][a-z0-9]+[a-z0-9]$/)]],
        artist_name: ['', [Validators.required, Validators.pattern(/^[a-zA-záéíóúÁÉÍÓÚñÑ][a-zA-z0-9áéíóúÁÉÍÓÚñÑ\s'\-]+[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9]$/)]],
        email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
        location: ['', [Validators.required, Validators.pattern(/^[a-zA-záéíóúÁÉÍÓÚñÑ][a-zA-z0-9áéíóúÁÉÍÓÚñÑ\s'\-]+[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9]$/)]]
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

    error.error.forEach((errMsg:string) => {

      if(errMsg=="artist name already exists")this.errorName = true
      if(errMsg=="email already exists") this.errorEmail = true
      if(errMsg=="username already exists") this.errorUsername = true

    });


  }


  onSubmit() {

    this.isSent = true

    console.log("Enviar form");

    if (this.mForm.invalid || this.f.password?.value != this.f.confirm_password?.value) {
      this.errorPass = true
      return
    }
    /*Hacer llamada al service
    Hacer dos servicios: user, people
    llamar al servicio de login y en la respuesta guardar en el localStorage el token y redirigir al DASHBOARD
    */

    const register: Register = new Register()

    register.username = this.f.username?.value
    register.password = this.f.password?.value
    register.artist_name = this.f.artist_name?.value
    register.email = this.f.email?.value
    register.location = this.f.location?.value

    console.log(register)

    this.userService.register(register).subscribe((data: any) => {
      localStorage.setItem("token",data.access_token)
      localStorage.setItem("username",data.data.username)
      this.router.navigate([`/${data.data.username}`])
      console.log(data)
    },
      error => {
        console.log("Error:", error);
        this.setErrors(error);

      }
    );
 }
}
