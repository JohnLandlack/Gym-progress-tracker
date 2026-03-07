import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from './register/user.model';
import { tap, map } from 'rxjs/operators';

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

  private _user=new BehaviorSubject<User | null>(null);

  private _userIsAuthenticated = true;

  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  constructor(private http: HttpClient){

  }

  private _isUserAuthenticated = false;
  

  get isUserAuthenticated() {
    return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          return !!user.token;
        } else {
          return false;
        }
      })
    );
  }

  register(user: UserData){
    this._isUserAuthenticated=true;
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
      {email: user.email, password: user.password, returnSecureToken: true}
    ).pipe( 
    tap((resData: any) => {
      
      const expirationTime = new Date(new Date().getTime() + +resData.expiresIn * 1000);
      
      // Pravimo našeg korisnika
      const loggedUser = new User(
        resData.localId, 
        resData.email, 
        resData.idToken, 
        expirationTime
      );

      // Šaljemo korisnika u naš BehaviorSubject
      this._user.next(loggedUser);
    })
  );
  }

 login(user: UserData) {
  this._isUserAuthenticated = true;

  return this.http.post<AuthResponseData>(
    
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
    
    
    { 
      email: user.email, 
      password: user.password, 
      returnSecureToken: true 
    }
  ).pipe( 
    tap((resData: any) => {
      
      const expirationTime = new Date(new Date().getTime() + +resData.expiresIn * 1000);
      
      // Pravimo našeg korisnika
      const loggedUser = new User(
        resData.localId, 
        resData.email, 
        resData.idToken, 
        expirationTime
      );

      // Šaljemo korisnika u naš BehaviorSubject
      this._user.next(loggedUser);
    })
  );
}

  logOut(){
    this._user.next(null);
  }



}
