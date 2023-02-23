import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SetterGentterService } from './services/setter-gentter.service';
import { UserSessionService } from './services/user-session.service';
import { StoreService } from './services/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Messaging';
  loginView!: boolean;
  loginStatus!: boolean;
  dataset: any = {};
  val!: boolean;
  constructor(
    private router: Router,
    private service: SetterGentterService,
    private userSession: UserSessionService,
    private storeServ: StoreService
  ) {}

  ngOnInit() {
    this.loginView = this.service.getLoginView();
    this.loginStatus = this.service.getLoginStatus();
  }

  Logout() {
    let singleUser: any = {};
    this.storeServ
      .getSingleUser(this.userSession.getEmailSession())
      .subscribe((result: any) => {
        singleUser = result.data;
        // console.log(singleUser);
        this.dataset['name'] = singleUser[0].name;
        this.dataset['email'] = singleUser[0].email;
        this.dataset['password'] = singleUser[0].password;
        this.dataset['phone'] = singleUser[0].phone;
        this.dataset['status'] = 'offline';
        this.storeServ
          .upldateUser(this.dataset, singleUser[0]._id)
          .subscribe((result) => {
            this.router.navigate(['/login']);
            this.service.setLoginView(true);
            this.service.setLoginStatus(false);
            this.userSession.setSession('loggedOut', '', '', '');
            this.ngOnInit();
          });
      });
  }
}
