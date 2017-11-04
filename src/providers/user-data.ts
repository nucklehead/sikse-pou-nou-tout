import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http, Headers } from '@angular/http';
import { UserOptions } from '../interfaces/user-options';

let apiUrl = '/server/api/';


@Injectable()
export class UserData {
  _favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  constructor(
    public http: Http,
    public events: Events,
    public storage: Storage
  ) {}

  hasFavorite(sessionName: string): boolean {
    return (this._favorites.indexOf(sessionName) > -1);
  };

  addFavorite(sessionName: string): void {
    this._favorites.push(sessionName);
  };

  removeFavorite(sessionName: string): void {
    let index = this._favorites.indexOf(sessionName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  };

  login(credentials: UserOptions) {
      return new Promise(resolve => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(apiUrl+'login', JSON.stringify(credentials), {headers: headers})
          .subscribe(res => {
              if(res.json().loggedIn){
                console.log("I am logged so waht");
                this.storage.set(this.HAS_LOGGED_IN, true);
                this.setUsername(credentials.username);
                this.setToken(res.json().token);
                this.events.publish('user:login');
                resolve(true);
              }
              else{
                console.log("I didnt work");
                console.log(JSON.stringify(res.json()));
                resolve(false);
              }
          });
    });
  };

  signup(credentials: UserOptions) {
    return new Promise(resolve => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post(apiUrl+'account', JSON.stringify(credentials), {headers: headers})
        .subscribe(res => {
          if(res.json().id ){
            this.login(credentials);
            this.events.publish('user:signup');
            resolve(true);
          }
          else{
            resolve(false);
          }
        });
    });
  };

  logout(): void {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('username');
    this.storage.remove('token');
    this.events.publish('user:logout');
  };

  setUsername(username: string): void {
    this.storage.set('username', username);
  };

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  };

  setToken(token: string): void {
    this.storage.set('token', token);
  };

  getToken(): Promise<string> {
    return this.storage.get('token').then((value) => {
      return value;
    });
  };

  setId(id: string): void {
    this.storage.set('id', id);
  };

  getId(): Promise<string> {
    return this.storage.get('id').then((value) => {
      return value;
    });
  };

  hasLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  };

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  };
}
