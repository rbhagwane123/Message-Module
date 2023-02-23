import { AppComponent } from './../app.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SetterGentterService } from '../services/setter-gentter.service';
import { StoreService } from '../services/store.service';
import { UserSessionService } from '../services/user-session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  InputemaiL: string = '';
  Inputpassword: string = '';
  singleUser: any;
  dataset: any = {};
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private storeServ: StoreService,
    private userSession: UserSessionService,
    private setterServ: SetterGentterService,
    private component: AppComponent
  ) {}

  ngOnInit() {
    if (this.userSession.getSession() == 'loggedIn') {
      this.router.navigate(['/home']);
      this.setterServ.setLoginView(false);
      this.component.loginStatus = true;
      this.component.ngOnInit();
    } else {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
      });
    }
  }
  onLogin() {
    this.InputemaiL = this.loginForm.get('email')?.value;
    this.Inputpassword = this.loginForm.get('password')?.value;
    this.storeServ.getSingleUser(this.InputemaiL).subscribe((data: any) => {
      this.singleUser = data.data;

      if (data.data == '') {
        alert('Invalid user');
      } else if (this.singleUser[0].password == this.Inputpassword) {
        this.router.navigate(['/home']);
        this.setterServ.setLoginStatus(true);
        this.setterServ.setLoginView(false);
        this.upDateStatus(this.singleUser[0]);
        this.userSession.setSession(
          'loggedIn',
          this.singleUser[0].email,
          this.singleUser[0].password,
          this.singleUser[0].phone
        );
        this.component.ngOnInit();
      } else {
        alert('Wrong password');
        this.setterServ.setLoginStatus(false);
        this.setterServ.setLoginView(true);
        this.component.ngOnInit();
      }
    });
  }

  upDateStatus(singleUser: any) {
    this.dataset['name'] = singleUser.name;
    this.dataset['email'] = singleUser.email;
    this.dataset['password'] = singleUser.password;
    this.dataset['phone'] = singleUser.phone;
    this.dataset['status'] = 'online';

    this.storeServ
      .upldateUser(this.dataset, singleUser._id)
      .subscribe((result) => {});
  }
}
