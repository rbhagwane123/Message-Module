import { HomeComponent } from './../home/home.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../app.component';
import { SetterGentterService } from '../services/setter-gentter.service';
import { StoreService } from '../services/store.service';
import { UserSessionService } from '../services/user-session.service';

const URL = 'http://localhost:4000/api/chatUploads';
@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.css'],
})
export class UploadDocumentComponent implements OnInit {
  docForm: any;
  inputType: string = '';
  imageData!: string;
  chatArray: any = {};
  roomValue: any = {};

  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image',
  });

  ngOnInit() {
    this.docForm = this.fb.group({
      image: ['', [Validators.required]],
    });

    this.uploader.onAfterAddingFile = (file) => {
      if (file.file.type == 'application/pdf') {
        const _id = this.makeid(5);
        this.imageData =
          '/' +
          this.userSession.getPhoneSession()?.toString() +
          _id.toString().trim() +
          '.pdf';
        file.file.name =
          this.userSession.getPhoneSession()?.toString() + _id.toString();
        this.inputType = '.pdf';
        file.withCredentials = false;
      } else if (
        file.file.type == 'image/jpeg' ||
        file.file.type == 'image/jpg' ||
        file.file.type == 'image/png'
      ) {
        // console.log(this.registerForm.get('name')?.value);
        const _id = this.makeid(5);
        this.imageData =
          '/' +
          this.userSession.getPhoneSession()?.toString() +
          _id.toString().trim() +
          '.jpeg';
        file.file.name =
          this.userSession.getPhoneSession()?.toString() + _id.toString();
        this.inputType = '.jpeg';
        file.withCredentials = false;
      }
    };

    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details: ', item);
      console.log(URL + this.imageData);
      this.storageServ.getAllMessage().subscribe((result: any) => {
        this.roomValue = result.data;

        const storeIndex = this.roomValue.findIndex(
          (storage: any) => storage.roomId === this.setterServ.getRoom()
        );

        this.chatArray = this.roomValue[storeIndex];
        this.chatArray.chats.push({
          user: this.setterServ.getcurrentUserName(),
          imgMssg: URL + this.imageData,
        });

        this.storageServ
          .updateSingleMessage(this.chatArray, this.chatArray._id)
          .subscribe((res: any) => {

            // this.homeComp.selectUserHandler();
            this.homeComp.selectUserHandler(this.setterServ.getPhone(), this.setterServ.getEmail());
            this.router.navigate(['/home']);
            this.modalService.dismissAll();
          });
      });
    };
  }

  constructor(
    private fb: FormBuilder,
    private config: NgbModalConfig,
    private modalService: NgbModal,
    private router: Router,
    private userSession: UserSessionService,
    private storageServ: StoreService,
    private component: AppComponent,
    private setterServ: SetterGentterService,
    private toastr: ToastrService,
    private homeComp: HomeComponent
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  open(content: any) {
    this.modalService.open(content);
  }
  makeid(length: number) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
}
