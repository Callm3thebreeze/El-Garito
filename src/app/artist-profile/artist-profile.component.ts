import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthGuardService } from './../services/auth/auth-guard.service';
import { SocialService } from './../services/social/social.service';
import { Social } from './../models/social.model';
import { UserService } from './../services/user.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { faSpotify, faTwitch, faSoundcloud } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faTimesCircle, faPlus, faTimes, faEdit, faEthernet, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-artist-profile',
  templateUrl: './artist-profile.component.html',
  styleUrls: ['./artist-profile.component.scss'],

})
export class ArtistProfileComponent implements OnInit {

  public navbarCollapsed = true;

  faSpotify = faSpotify;
  faInstagram = faInstagram;
  faSoundcloud = faSoundcloud;
  faFacebook = faFacebook;
  faYoutube = faYoutube;
  faTwitter = faTwitter;
  faTwitch = faTwitch;
  faEthernet = faEthernet;
  faPlusCircle = faPlusCircle
  social = new Social()
  username: string = ""
  canEdit : boolean = false
  isSent = false
  profilePicToShow:string = "../assets/img/no-image.jpg"
  closeIcon = faTimesCircle
  closeModalIcon = faTimes
  editIcon = faEdit
  addIcon = faPlus
  profilePicForm: FormGroup
  imgSrc: string = "../assets/img/no-image.jpg"
  selectedImg: any = null
  artistName: string = ""
  socialNetworks: any = []

  constructor( private modal: NgbModal,
    private router: Router,
    private userService: UserService,
    private guardService: AuthGuardService,
    private socialService : SocialService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage) {

      this.profilePicForm = this.formBuilder.group({
        profilePic:['',[Validators.required]]
      })

     }

  openModalForm(content: TemplateRef<any>){
    this.modal.open(content)
  }

  showPreview(event: any){

    if(event.target.files && event.target.files[0]){
      const reader = new FileReader()
      reader.onload = (el:any) => this.imgSrc = el.target.result
      reader.readAsDataURL(event.target.files[0])
      this.selectedImg = event.target.files[0]
    } else {
      this.imgSrc = "../assets/img/no-image.jpg"
      this.selectedImg = null
    }

  }

  get f() {
    return this.profilePicForm.controls
  }

  onSubmit(){
     this.isSent = true

     if(this.profilePicForm.invalid){
       console.log(this.f.profilePic.errors)
       this.isSent = false
       return
     }
     this.uploadToFireStorage()
  }

  uploadToFireStorage(){
    let filePath = `profilepics/${this.selectedImg.name}_${new Date().getTime()}`
    const fileRef = this.storage.ref(filePath)
    this.storage.upload(filePath, this.selectedImg).snapshotChanges().pipe(
      finalize(()=>{
          fileRef.getDownloadURL().subscribe((url:any)=>{
            this.updateProfilePic(url)
          })
      })
    ).subscribe()

  }

  updateProfilePic(urlProfilePic: string){
     this.userService.updateProfilePic(urlProfilePic).subscribe((data:any)=>{
       console.log(data)
       this.ngOnInit()
     })
  }

  resetForm(){
    this.profilePicForm.reset()
    this.profilePicForm.setValue({
      profilePic: ''
    })
    this.imgSrc = "../assets/img/no-image.jpg"
    this.selectedImg = null
    this.isSent =false
  }

  sendData(){

    console.log(this.social)
    this.socialService.updateSocial(this.social).subscribe((data:any) => {
      this.ngOnInit()
    })

  }

  addSocialNetworkToArray(){

    this.socialNetworks = [
    {
      link: this.social.soundcloud,
      icon: faSoundcloud,
      title: "Soundcloud"
    },
    {
      link: this.social.youtube,
      icon: faYoutube,
      title: "Youtube"
    },
    {
      link: this.social.instagram,
      icon: faInstagram,
      title: "Instagram"
    },
    {
      link: this.social.facebook,
      icon: faFacebook,
      title: "Facebook"
    },
    {
      link: this.social.twitter,
      icon: faTwitter,
      title: "Twitter"
    },
    {
      link: this.social.spotify,
      icon: faSpotify,
      title: "Spotify"
    },
    {
      link: this.social.web,
      icon: faEthernet,
      title: "Web"
    },
    {
      link: this.social.twitch,
      icon: faTwitch,
      title: "Twitch"
    }
  ]

  }

  ngOnInit() {

    //localhost:4200/
    this.resetForm()
    this.activatedRoute.params.subscribe(params => {
      const usernameLS = localStorage.getItem("username")
      let username = params['username']

      if(usernameLS && usernameLS == username && this.guardService.canActivate()) {
        this.canEdit = true
      }

      if (username || username=="") {
        this.username = username
        this.userService.getUser(username).subscribe((data:any)=>{
          this.social = data.social
          this.profilePicToShow = data.profile_pic
          this.artistName = data.artist_name
          if(this.profilePicToShow == "") this.profilePicToShow = "../assets/img/no-image.jpg"
          console.log(this.profilePicToShow)
          this.addSocialNetworkToArray()
          console.log(data)
        },error => {
          console.log("Error:", error);
          this.router.navigate(['/404'])
        })
      } else  {
         this.router.navigate(['/'])
      }

    })


  }
}
