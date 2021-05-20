import { Component, OnInit } from '@angular/core';
import {Concert} from '../models/concert.model';
@Component({
  selector: 'app-concerts',
  templateUrl: './concerts.component.html',
  styleUrls: ['./concerts.component.scss']
})
export class ConcertsComponent implements OnInit {

  constructor() { }

  months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

  concerts:Concert[] = []


  concertsdd = [
    {month: "Abril", days: {
      day: "jueves 25",
      city: "Albacete",
      place: "Sala Clandestino"
    }},
    {month: "Mayo", days: {
      day: "jueves 25",
      city: "Albacete",
      place: "Sala Clandestino"
    }},
    {month: "Junio", days: {
      day: "jueves 25",
      city: "Albacete",
      place: "Sala Clandestino"
    }},
    {month: "Julio", days: {
      day: "jueves 25",
      city: "Albacete",
      place: "Sala Clandestino"
    }},
    {month: "Agosto", detail: {
      day: "jueves 25",
      city: "Albacete",
      place: "Sala Clandestino"
    }},
    {month: "Septiembre", detail: {
      day: "jueves 25",
      city: "Albacete",
      place: "Sala Clandestino"
    }},
    {month: "Octubre", detail: {
      day: "jueves 25",
      city: "Albacete",
      place: "Sala Clandestino"
    }},
    {month: "Noviembre", detail: {
      day: "jueves 25",
      city: "Albacete",
      place: "Sala Clandestino"
    }},
  ]




  ngOnInit() {

    const concierto1 = new Concert()

    concierto1.month = "Abril"
    concierto1.day = 25
    concierto1.city = "Toledo"
    concierto1.place = "Sala Delocos"



    const concierto2 = new Concert()

    concierto2.month = "Mayo"
    concierto2.day = 12
    concierto2.city = "Albacete"
    concierto2.place = "Sala Jumanji"

    this.concerts = [concierto1, concierto2, concierto1, concierto2]
    console.log(this.concerts)
  }

}
