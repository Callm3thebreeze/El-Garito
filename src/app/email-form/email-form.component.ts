import { EmailService } from './../services/email/email.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { Email } from '../models/email.model';


@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.scss']
})
export class EmailFormComponent implements OnInit {

  mForm : FormGroup
  isSent: boolean = false

  constructor(private formBuilder: FormBuilder, private emailService: EmailService) {
    this.mForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-záéíóúÁÉÍÓÚñÑ][a-zA-z0-9áéíóúÁÉÍÓÚñÑ\s'\-]+[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9]$/)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      message: ['', [Validators.required]],
      subject: ['', [Validators.required, Validators.pattern(/^[a-zA-záéíóúÁÉÍÓÚñÑ][a-zA-z0-9áéíóúÁÉÍÓÚñÑ\s'\-]+[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9]$/)]]
    })
   }

  faMail = faEnvelope

  get f() {
    return this.mForm.controls
  }

  onSubmit() {

    this.isSent = true
    if (this.mForm.invalid) {
      return
    }
    /*Hacer llamada al service
    Hacer dos servicios: user, people
    llamar al servicio de login y en la respuesta guardar en el localStorage el token y redirigir al DASHBOARD
    */

    const email: Email = new Email()

    email.name = this.f.name?.value
    email.email = this.f.email?.value
    email.message = this.f.message?.value
    email.subject = this.f.subject?.value
    console.log(email)

    this.emailService.sendEmail(email).subscribe((data: any) => {
      console.log(data)
      this.ngOnInit()
    },
      error => {
        console.log("Error:", error);
        this.ngOnInit()
      }
    );
 }


  ngOnInit() {
    this.isSent = false
  }

}
