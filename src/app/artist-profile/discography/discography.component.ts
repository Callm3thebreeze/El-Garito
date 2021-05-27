import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthGuardService } from './../../services/auth/auth-guard.service';
import { UserService } from './../../services/user.service';
import { AlbumService } from './../../services/album/album.service';
import { Album } from './../../models/album.model';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faTimesCircle, faPlus, faTimes, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-discography',
  templateUrl: './discography.component.html',
  styleUrls: ['./discography.component.scss']
})
export class DiscographyComponent implements OnInit {

  albums : Album[] = []
  songs : string[] = []
  songName: string = ""
  errorSong: boolean = false
  closeIcon = faTimesCircle
  closeModalIcon = faTimes
  addIcon = faPlus
  editIcon = faEdit
  removeIcon = faTrash
  mForm: FormGroup
  imgSrc: string = "../assets/img/no-image.jpg"
  selectedImg: any = null
  isSent: boolean = false
  canEdit : boolean = false
  modalRef: any

  constructor(private modal: NgbModal,
    private router: Router,
    private fb: FormBuilder,
    private albumService: AlbumService,
    private userService: UserService,
    private guardService: AuthGuardService,
    private activatedRoute: ActivatedRoute,
    private storage: AngularFireStorage) {
      this.mForm = this.fb.group({
        name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z0-9\s]+[a-zA-Z0-9]$/)]],
        releaseDate: ['', [Validators.required, Validators.pattern(/^\d{4}([./-])\d{2}\1\d{2}$/)]],
        picture: ['', [Validators.required]]
       })
     }

  openModalForm(content: TemplateRef<any>){
    this.modalRef = this.modal.open(content)
  }

  get f() {
    return this.mForm.controls
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

  onSubmit() {

    this.isSent = true
    if (this.mForm.invalid) {
      return
    }
    this.uploadToFireStorage()
 }

 uploadToFireStorage(){
  let filePath = `discography/${this.selectedImg.name}_${new Date().getTime()}`
  const fileRef = this.storage.ref(filePath)
  this.storage.upload(filePath, this.selectedImg).snapshotChanges().pipe(
    finalize(()=>{
        fileRef.getDownloadURL().subscribe((url:any)=>{
          this.updateDiscography(url)
        })
    })
  ).subscribe()

}

updateDiscography(urlMemberPic:string){

  const album: Album = new Album()

  album.name = this.f.name?.value
  album.picture = urlMemberPic
  album.songs = this.songs
  album.releaseDate = this.f.releaseDate?.value

  console.log(album)

  this.albumService.saveAlbum(album).subscribe((data: any) => {
    this.songs = []
    this.modalRef.close()
    this.loadData()
    console.log(data)
  },
    error => {
      console.log("Error:", error);
    }
  );
 }

  addSong() {
    if (this.songName.trim() != "") {
      this.songs.push(this.songName)
      this.songName = ""
    } else {
      this.errorSong = true
    }
  }

  removeSong(index: number){
    this.songs.splice(index,1)
  }

  removeAlbum(album_id : string){

    this.albumService.deleteAlbum(album_id).subscribe((data:any)=>{
      this.songs = []
      this.loadData()
    })

  }


  addShowAttr(){
    const albums = this.albums.reduce((acc: Album[], album: Album)=>{

      let newAlbum: Album = {...album, show:false}
      acc.push(newAlbum)
      return acc

    },[])
    this.albums = albums
  }

  loadData(){

    let username = this.activatedRoute.parent?.snapshot.params["username"]
    const usernameLS = localStorage.getItem("username")
    if (usernameLS && usernameLS == username && this.guardService.canActivate()) {
      this.canEdit = true
    }

    if (username) {
      this.userService.getUser(username).subscribe((data: any) => {
        this.albums = data.discography as Album[]
        this.addShowAttr()
      }, error => {
        console.log("Error:", error);
      })
    } else {
      console.log("No existe username")
    }
  }
  ngOnInit() {
    this.loadData()
  }

}
