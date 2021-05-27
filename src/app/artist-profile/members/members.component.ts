import { AngularFireStorage } from '@angular/fire/storage';
import { AuthGuardService } from './../../services/auth/auth-guard.service';
import { MemberService } from './../../services/member/member.service';
import { Member } from './../../models/member.model';
import { UserService } from './../../services/user.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faTimesCircle, faPlus, faTimes, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  members: Member[] = []
  closeIcon = faTimesCircle
  closeModalIcon = faTimes
  addIcon = faPlus
  editIcon = faEdit
  removeIcon = faTrash
  mForm: FormGroup
  isSent: boolean = false
  canEdit: boolean = false
  infoError: boolean = false
  imgSrc: string = "../assets/img/no-image.jpg"
  selectedImg: any = null
  modalRef: any

  constructor(private modal: NgbModal,
    private router: Router,
    private fb: FormBuilder,
    private memberService : MemberService,
    private userService: UserService,
    private guardService: AuthGuardService,
    private activatedRoute : ActivatedRoute,
    private storage: AngularFireStorage) {
      this.mForm = this.fb.group({
        name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z0-9\s]+[a-zA-Z0-9]$/)]],
        role: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z0-9\s,\.]+[a-zA-Z0-9]$/)]],
        picture: ['', [Validators.required]]
       })
     }

  openModalForm(content: TemplateRef<any>){
    this.modalRef = this.modal.open(content)
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
    return this.mForm.controls
  }

  onSubmit() {

    this.isSent = true
    if (this.mForm.invalid) {
      return
    }
    this.uploadToFireStorage()
 }

 uploadToFireStorage(){
  let filePath = `members/${this.selectedImg.name}_${new Date().getTime()}`
  const fileRef = this.storage.ref(filePath)
  this.storage.upload(filePath, this.selectedImg).snapshotChanges().pipe(
    finalize(()=>{
        fileRef.getDownloadURL().subscribe((url:any)=>{
          this.updateMember(url)
        })
    })
  ).subscribe()

}

 updateMember(urlMemberPic:string){

  const member: Member = new Member()

  member.name = this.f.name?.value
  member.picture = urlMemberPic
  member.role = this.f.role?.value

  console.log(member)

  this.memberService.saveMember(member).subscribe((data: any) => {
    console.log(data)
    this.modalRef.close()
    this.ngOnInit()
  },
    error => {
      if(error.error == "add info first"){
        this.infoError = true
        console.log(this.infoError)
      }
    }
  );
 }

 removeMember(member_id : string){

  this.memberService.deleteMember(member_id).subscribe((data:any)=>{
    this.ngOnInit()
  })

}

  ngOnInit() {

    let username = this.activatedRoute.parent?.snapshot.params["username"]
    const usernameLS = localStorage.getItem("username")
    if (usernameLS && usernameLS == username && this.guardService.canActivate()) {
      this.canEdit = true
    }

    if (username) {
      this.userService.getUser(username).subscribe((data: any) => {
        if(data.info && data.info.members){
          this.members = data.info.members as Member[]
         }
         console.log(this.members)
      }, error => {

        console.log(error)

      })
    } else {
      console.log("No existe username")
    }
  }

}
