import { Router } from '@angular/router';
import { routes } from './../app.module';
import { AppComponent } from './../app.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { UserSessionService } from '../services/user-session.service';
import { StoreService } from '../services/store.service';
import { SetterGentterService } from '../services/setter-gentter.service';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';

const URL = 'http://localhost:4000/api/upload';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  dataset: any = {};
  inputType: string = '';
  imageData!: string;

  constructor(
    private fb: FormBuilder,
    private config: NgbModalConfig,
    private modalService: NgbModal,
    private router: Router,
    private userSession: UserSessionService,
    private storageServ: StoreService,
    private component: AppComponent,
    private setterServ: SetterGentterService,
    private toastr: ToastrService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image',
  });

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });

    this.uploader.onAfterAddingFile = (file) => {
      if (file.file.type == 'application/pdf') {
        // console.log(this.registerForm.get('name')?.value);
        file.file.name = this.registerForm.get('name')?.value;
        this.inputType = '.pdf';
        file.withCredentials = false;
      } else if (
        file.file.type == 'image/jpeg' ||
        file.file.type == 'image/jpg' ||
        file.file.type == 'image/png'
      ) {
        // console.log(this.registerForm.get('name')?.value);
        file.file.name = this.registerForm.get('name')?.value;
        this.inputType = '.jpeg';
        file.withCredentials = false;
      }
    };

    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details: ', item);
      this.arrayFilling();
      this.storageServ.createUser(this.dataset).subscribe(
        (data: any) => {
          if (data.status) {
            alert('Account created');
            this.router.navigate(['/login']);
            this.modalService.dismissAll();
            this.setterServ.setLoginView(true);
            this.setterServ.setLoginStatus(false);
            this.component.ngOnInit();
          }
        },
        (error) => {
          alert(error);
        }
      );

      this.toastr.success('File successfully uploaded!');
    };
  }

  open(content: any) {
    this.modalService.open(content);
  }

  arrayFilling() {
    this.dataset['name'] = this.registerForm.get('name')?.value;
    this.dataset['email'] = this.registerForm.get('email')?.value;
    this.dataset['password'] = this.registerForm.get('password')?.value;
    this.dataset['phone'] = this.registerForm.get('phone')?.value;
    this.dataset['status'] = 'offline';
    this.dataset['image'] =
      "http://localhost:4000/api/uploads/" +
      this.registerForm.get('name')?.value +
      this.inputType;
  }
}
