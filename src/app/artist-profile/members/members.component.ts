import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {


  constructor() { }

  members = [

    {name: "Ínigo Bregel",
    role: "Voz principal, teclados",
    picture:"https://img.discogs.com/Lm1lrOq6qmQHkQxgo6jr13G08z4=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-4933912-1608223092-1953.jpeg.jpg"},

    {name: "Germán Herrero",
    role: "Guitarra solista",
    picture:"https://ta.azureedge.net/p/images/usuarios/l/u_PPxRb51EgT9tpCDlNnTYW6OFIGQsMs0.jpg/600x600cut/"},

    {name: "Andrea Conti",
    role: "Batería",
    picture:"https://denaflows.com/blog/gallery/03496-5d4-11-11-17-final-xix-concurso-pop-rock-villa-de-bilbao-los-estanques/025-Final-XIX-Concurso-Pop-Rock-Villa-de-Bilbao-Los-Estanques-11XI17-por-Dena-Flows.jpg"},

    {name: "Dani Pozo",
    role: "Bajista",
    picture:"https://ta.azureedge.net/p/images/usuarios/l/ZIMIy1rP1EjfDs6syaxCSY-goLIixjAS0.jpg/600x600cut/"},

  ]

  ngOnInit() {
  }

}
