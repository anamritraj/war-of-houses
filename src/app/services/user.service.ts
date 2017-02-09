import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { GlobalConfig } from '../shared/config.model'
import { TokenManager } from './token-manager.service';
import 'rxjs/add/operator/map';

@Injectable()

export class UserService {
  _url: string;
  _token: string;
  constructor( private http: Http, private _tokenmanager: TokenManager) { 
    this._url = GlobalConfig.BASE_API_URL;
  }

  setToken(){
    this._token = "?token=" + this._tokenmanager.retrieve();
  }
  authenticate(fb_access_token: string){
    return this.http.post(this._url +'api/authenticate', {'access_token': fb_access_token})
    .map(res => res.json());
  }

  getAllUsers(){
  	return this.http.get(this._url +'user')
  	.map(res => res.json());
  }

  getUser(){
    this.setToken();
    return this.http.get(this._url +'user' + this._token)
    .map(res => res.json()); 
  }

  registerUser(user){
		return this.http.post(this._url +'user', user)
  		.map(res => res.json());
  }

  updateUserEvent(user){
    let url = this._url +"user/events/"+user.ec_id;
    return this.http.put(url, user)
      .map(res => res.json());
  }
}
