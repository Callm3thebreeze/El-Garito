import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private router: Router) { }

  public navbarCollapsed = true;
  username: string = "home"
  artistName: string = ""

  logOut(){
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    this.router.navigate(['/'])
  }
/*
  goToSearch(){
    this.router.navigate(['/search/'+this.artistName])
  } */

  ngOnInit() {

    const username = localStorage.getItem("username")
    if(username) this.username = username
  }

}
