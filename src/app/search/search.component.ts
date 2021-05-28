import { UserService } from './../services/user.service';
import { genresList } from './../models/genres.list';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Artist } from '../models/artist.model';
import { cities } from '../models/citiesList';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor( private activatedRoute: ActivatedRoute, private userService:UserService, private router: Router) { }

  genres: string[] = genresList
  provincias: string[] = cities
  artistName : string = ""
  genre: string = ""
  location: string = ""
  notUsers: boolean = false
  artists : Artist[] = []

  loadData(){

    this.userService.getUsers(this.artistName, this.genre, this.location).subscribe((data:any)=>{
      this.artists = []
      if(data == 'not users found' || data == null){
        this.notUsers = true
        this.router.navigate(['/search/'+this.artistName])
      } else {
        this.notUsers = false
        data.forEach((user:any) => {
          this.formatArtist(user)
       });
      }
    })
  }

  formatArtist(data: any){

    const newUser = new Artist()
    newUser.name = data.artist_name
    newUser.picture = (data.profile_pic && data.profile_pic!="")? data.profile_pic : "../assets/img/no-image.jpg"
    newUser.username = data.username
    this.artists.push(newUser)
  }

  getUsers(){
    this.loadData()
    if(this.artistName && this.artistName != "")
    this.router.navigate(['/search/'+this.artistName])
    //REVISAR
   /*  this.router.navigate(['/search/'+this.artistName]) */
  }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {

    let artistname = params["artistname"]
    if(artistname){
      this.artistName = artistname
    } else {
      console.log("No existe artist name")
    }
    this.loadData()

    })
  }
}
