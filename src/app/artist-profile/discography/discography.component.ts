import { Album } from './../../models/album.model';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-discography',
  templateUrl: './discography.component.html',
  styleUrls: ['./discography.component.scss']
})
export class DiscographyComponent implements OnInit {

  albums : Album[] = []

  constructor() { }

  addShowAttr(){
    const albums = this.albums.reduce((acc: Album[], album: Album)=>{

      let newAlbum: Album = {...album, show:false}
      acc.push(newAlbum)
      return acc

    },[])
    this.albums = albums
    console.log(this.albums)
  }

  ngOnInit() {
    this.albums = [
      {name: "IV",
      date: "2020",
      picture:"https://static.fnac-static.com/multimedia/Images/ES/NR/29/4d/5c/6049065/1540-1.jpg",
      songs: ["No hay Vuelta Atrás", "Flor de Limón", "Juan el Largo", "Clavos de Papel", "La Aguja", "Soy Español, pero tengo un Kebab", "Comunión", "Emilio el Busagre", "Mr Clack", "Nací Santo", "Rey del Ajuar", "Rosario", "Reunión"],
      },

      {name: "IV",
      date: "2020",
      picture:"https://f4.bcbits.com/img/a2432233182_10.jpg",
      songs: ["No hay Vuelta Atrás", "Flor de Limón", "Juan el Largo", "Clavos de Papel", "La Aguja", "Soy Español, pero tengo un Kebab", "Comunión", "Emilio el Busagre", "Mr Clack", "Nací Santo", "Rey del Ajuar", "Rosario", "Reunión"]

    },

      {name: "IV",
      date: "2020",
      picture:"https://f4.bcbits.com/img/a3653919065_10.jpg",
      songs: ["No hay Vuelta Atrás", "Flor de Limón", "Juan el Largo", "Clavos de Papel", "La Aguja", "Soy Español, pero tengo un Kebab", "Comunión", "Emilio el Busagre", "Mr Clack", "Nací Santo", "Rey del Ajuar", "Rosario", "Reunión"]

    },

      {name: "IV",
      date: "2020",
      picture:"https://img.discogs.com/v58Jf6ujgJZXLMiWRpKsz7F-3l8=/fit-in/500x500/filters:strip_icc():format(webp):mode_rgb():quality(90)/discogs-images/R-13631886-1557910729-1438.jpeg.jpg",
      songs: ["No hay Vuelta Atrás", "Flor de Limón", "Juan el Largo", "Clavos de Papel", "La Aguja", "Soy Español, pero tengo un Kebab", "Comunión", "Emilio el Busagre", "Mr Clack", "Nací Santo", "Rey del Ajuar", "Rosario", "Reunión"]

    }
  ]
    this.addShowAttr()
  }

}
