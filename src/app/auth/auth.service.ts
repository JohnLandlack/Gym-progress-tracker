import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from './register/user.model';
import { tap, map } from 'rxjs/operators';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}

interface UserData {
  name?: string;
  username?: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {}

  get user() {
    return this._user.asObservable();
  }

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

  get userId() {
    return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          return user.id;
        } else {
          return null;
        }
      })
    );
  }

  get token() {
    return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          return user.token;
        } else {
          return null;
        }
      })
    );
  }

  register(user: UserData) {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
      { email: user.email, password: user.password, returnSecureToken: true }
    ).pipe(
      tap(resData => {
        this.handleAuthentication(resData.localId, resData.email, resData.idToken, +resData.expiresIn);
      })
    );
  }

  login(user: UserData) {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
      { email: user.email, password: user.password, returnSecureToken: true }
    ).pipe(
      tap(resData => {
        this.handleAuthentication(resData.localId, resData.email, resData.idToken, +resData.expiresIn);
      })
    );
  }

  autoLogin() {
    const savedUser = localStorage.getItem('userData');
    if (!savedUser) {
      return;
    }
    const parsedUser = JSON.parse(savedUser);
    const expirationDate = new Date(parsedUser.tokenExpirationDate);

    const loadedUser = new User(
      parsedUser.id,
      parsedUser.email,
      parsedUser._token,
      expirationDate
    );

    if (loadedUser.token) {
      this._user.next(loadedUser);
    }
  }

  logOut() {
    this._user.next(null);
    localStorage.removeItem('userData');
  }

  private handleAuthentication(id: string, email: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(id, email, token, expirationDate);
    this._user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}