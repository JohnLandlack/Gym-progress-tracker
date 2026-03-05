import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

interface AuthResponseData{
  kind: string;
  idToken: string;
  email: string;
  refreshToken:string;
  localId: string;
  expiresIn: string;
  registered?: boolean;



}

interface UserData{
  name?:string;
  username?: string;
  email:string;
  password:string;
}




@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private _userIsAuthenticated = true;

  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  constructor(private http: HttpClient){

  }

  private _isUserAuthenticated = false;
  

  get isUserAuthenticated(): boolean{
    return this._isUserAuthenticated;
  }

  register(user: UserData){
    this._isUserAuthenticated=true;
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
      {email: user.email, password: user.password, returnSecureToken: true}
    
    
    );
  }

  logIn(user: UserData){
    this._isUserAuthenticated=true;
     return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
      {email: user.email, password: user.password, returnSecureToken: true}
      
    
    );

  }

  logOut(){
    this._isUserAuthenticated=false;
  }



}
