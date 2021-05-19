import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-concerts',
  templateUrl: './concerts.component.html',
  styleUrls: ['./concerts.component.scss']
})
export class ConcertsComponent implements OnInit {

  constructor() { }


  concerts = [
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
  }

}
