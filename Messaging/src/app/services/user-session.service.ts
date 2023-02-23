import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {

  constructor() { }

  setSession(loggedStatus:string, email:string, pass: string, phone: string)
  {
    sessionStorage.setItem('loggedStatus', loggedStatus);
    sessionStorage.setItem('email',email);
    sessionStorage.setItem('password',pass);
    sessionStorage.setItem('phone',phone);
  }
  getSession()
  {
    return sessionStorage.getItem('loggedStatus');
  }

  getEmailSession()
  {
    return sessionStorage.getItem('email');
  }

  getPhoneSession()
  {
    return sessionStorage.getItem('phone');
  }

}
