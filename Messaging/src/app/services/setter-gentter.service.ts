import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SetterGentterService {

  loginView:boolean=true;
  loginStatus:boolean=false;
  log:boolean= false;
  currentUserName!:string;
  roomId: string='';
  phone:string='';
  email:string='';

  constructor() { }

  setLoginView(val:boolean)
  {
    this.loginView = val;
  }
  getLoginView(){
    return this.loginView;
  }

  setLoginStatus(val:boolean)
  {
    this.loginStatus = val;
  }
  getLoginStatus(){
    return this.loginStatus;
  }

  setLog(val:boolean){
    this.log = val;
  }

  getLog()
  {
    return this.log;
  }

  // setimgMssfUrl(user:string, image:string)
  // {
  //   this.messageArray.push({
  //     user:user,
  //     imgMssg: image
  //   });
  // }

  // getimgMssfUrl()
  // {
  //   return this.messageArray;
  // }

  setcurrentUserName(val:string)
  {
    this.currentUserName = val;
  }
  getcurrentUserName()
  {
    return this.currentUserName;
  }

  setRoom(room:any)
  {
    this.roomId = room;
  }
  getRoom()
  {
    return this.roomId;
  }

  setPhone(val:string)
  {
    this.phone = val;
  }

  setEmail(val:string)
  {
    this.email = val;
  }

  getPhone()
  {
    return this.phone;
  }

  getEmail()
  {
    return this.email;
  }
}
