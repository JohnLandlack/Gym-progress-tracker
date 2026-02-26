import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private _userIsAuthenticated = true;

  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  constructor(){

  }

  private _isUserAuthenticated = false;
  

  get isUserAuthenticated(): boolean{
    return this._isUserAuthenticated;
  }

  logIn(){
    this._isUserAuthenticated=true;

  }

  logOut(){
    this._isUserAuthenticated=false;
  }



}
