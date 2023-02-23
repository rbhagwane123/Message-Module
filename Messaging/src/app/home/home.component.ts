
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { AppComponent } from '../app.component';
import { ChatService } from '../services/chat.service';
import { SetterGentterService } from '../services/setter-gentter.service';
import { StoreService } from '../services/store.service';
import { UserSessionService } from '../services/user-session.service';
// import { RootObject } from '../chatData';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  loginStatus!: boolean;
  public roomId!: string;
  public messageText!: string;
  private storageArray: any;
  public showScreen = false;
  public phone!: string;
  public currentUser: any;
  public selectedUser: any;
  public listUsers: any;
  public messageArray: { user: string; message: string, imgMssg:string }[] = [];
  public roomValue: any = {};
  public roomsID: any = {};
  public chatArray: any = {};
  public status: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private storeServ: StoreService,
    private userSession: UserSessionService,
    private setterServ: SetterGentterService,
    private component: AppComponent,
    private chatService: ChatService,
    private modalService: NgbModal
  ) {}

  ngAfterViewInit() {

  }

  ngOnInit() {
    console.log('Called from upload');
    this.setterServ.setLoginStatus(true);
    this.renderData();
    this.chatService
      .getMessage()
      .subscribe((data: { user: string; room: string; message: string }) => {
        // this.messageArray.push(data);
        if (this.roomId) {
          setTimeout(() => {
            if (this.selectedUser.email) {
              this.statusViewSetting(this.selectedUser.email);
            }
            // this.storageArray = this.chatService.getStorage();
            this.storeServ.getAllMessage().subscribe((result: any) => {
              this.storageArray = result.data;
              const storeIndex = this.storageArray.findIndex(
                (storage: any) => storage.roomId === this.roomId
              );
              this.messageArray = this.storageArray[storeIndex].chats;
              // console.log(this.messageArray);
            });
          }, 500);
        }
      });
  }

  renderData() {
    this.storeServ.getAllUser().subscribe((result: any) => {
      this.listUsers = result.data;
      for (let i = 0; i < this.listUsers.length; i++) {
        if (this.listUsers[i].phone == this.userSession.getPhoneSession()) {
          this.listUsers.splice(i, 1);
        }
      }
      this.showScreen = true;
    });
  }

  checkingRoom(Value: any, phone: any) {
    let i = 0;
    for (let item of Value) {
      let splitValue = item.roomId.split('-');
      if (
        splitValue.includes(phone) &&
        splitValue.includes(this.userSession.getPhoneSession())
      ) {
        return item.roomId;
      } else if (Value.length - 1 == i) {
        this.roomId = this.userSession.getPhoneSession() + '-' + phone;
        this.roomsID['roomId'] = this.roomId;
        this.storeServ.createMessage(this.roomsID).subscribe((result) => {
          // console.log('Inserted new Person');
        });
        return this.roomId;
      }
      i = i + 1;
    }
  }

  statusViewSetting(email: any) {
    this.storeServ.getSingleUser(email).subscribe((result: any) => {
      if (result.data[0].status === 'online') {
        this.status = true;
      } else if (result.data[0].status === 'offline') {
        this.status = false;
      }
    });
  }

  selectUserHandler(phone: string, email: string): void {
    this.setterServ.setPhone(phone);
    this.setterServ.setEmail(email);
    this.statusViewSetting(email);
    this.storeServ
      .getSingleUser(this.userSession.getEmailSession())
      .subscribe((result: any) => {
        this.currentUser = result.data;
        this.setterServ.setcurrentUserName(this.currentUser[0].name);
      });
    this.storeServ.getSingleUser(email).subscribe((result: any) => {
      this.selectedUser = result.data[0];
      // console.log(this.selectedUser);
      this.storeServ.getAllMessage().subscribe((result: any) => {
        if (result.data.length != 0) {
          this.roomValue = result.data;
          this.roomId = this.checkingRoom(this.roomValue, phone);
          this.setterServ.setRoom(this.roomId);
          // this.roomId = "9167458152-9167458152";
          const storeIndex = this.roomValue.findIndex(
            (storage: any) => storage.roomId === this.roomId
          );

          this.messageArray = [];
          if (storeIndex > -1) {
            this.messageArray = this.roomValue[storeIndex].chats;
          }

          this.join(this.currentUser[0].name, this.roomId);
        } else {
          console.log('empty');
        }
      });
    });
  }

  join(username: string, roomId: string): void {
    this.chatService.joinRoom({ user: username, room: roomId });
  }

  FetchCurrentUser() {
    this.storeServ
      .getSingleUser(this.userSession.getEmailSession())
      .subscribe((result: any) => {
        this.currentUser = result.data;
      });
  }

  sendMessage(): void {
    let _id: string = '';
    this.FetchCurrentUser();
    this.statusViewSetting(this.selectedUser.email);
    this.selectUserHandler(this.selectedUser.phone, this.selectedUser.email);
    this.storeServ.getAllMessage().subscribe((result: any) => {
      this.roomValue = result.data;
      this.roomId = this.checkingRoom(this.roomValue, this.selectedUser.phone);

      this.chatService.sendMessage({
        user: this.currentUser[0].name,
        room: this.roomId,
        message: this.messageText,
      });
      // this.storageArray = this.chatService.getStorage();
      this.storageArray = this.roomValue;
      // console.log('STORAGE ARRAY: '+this.storageArray);

      const storeIndex = this.roomValue.findIndex(
        (storage: any) => storage.roomId === this.roomId
      );

      this.chatArray = this.roomValue[storeIndex];
      this.chatArray.chats.push({
        user: this.currentUser[0].name,
        message: this.messageText,
      });

      this.storeServ
        .updateSingleMessage(this.chatArray, this.chatArray._id)
        .subscribe((res: any) => {
          console.log('updateeddddd');
        });

      this.messageText = '';
    });
  }
}
