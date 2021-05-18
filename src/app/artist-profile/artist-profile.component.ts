import { Component, OnInit } from '@angular/core';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faSoundcloud } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-artist-profile',
  templateUrl: './artist-profile.component.html',
  styleUrls: ['./artist-profile.component.scss']
})
export class ArtistProfileComponent implements OnInit {

    constructor() { }

  public navbarCollapsed = true;

  faSpotify = faSpotify;
  faInstagram = faInstagram;
  faSoundcloud = faSoundcloud;
  faFacebook = faFacebook;
  faYoutube = faYoutube;
  faTwitter = faTwitter;

  socialNetworks= [

    {
      link: "https://open.spotify.com/artist/2viZosiTrNf88YlPRVHkos?si=5u599AduQmyu6K3PS5CvwA",
      icon: faSpotify,
      title: "Spotify"
    },
    {
      link: "https://soundcloud.com/losestanques",
      icon: faSoundcloud,
      title: "Soundcloud"
    },
    {
      link: "https://www.youtube.com/channel/UC1kTiQsGlc81VTS0VbsZEIQ",
      icon: faYoutube,
      title: "Youtube"
    },
    {
      link: "https://www.instagram.com/los_estanques/?hl=es",
      icon: faInstagram,
      title: "Instagram"
    },
    {
      link: "https://www.facebook.com/losestanquesband",
      icon: faFacebook,
      title: "Facebook"
    },
    {
      link: "https://twitter.com/Los_Estanques",
      icon: faTwitter,
      title: "Twitter"
    },
  ]


  ngOnInit() {
  }

}
