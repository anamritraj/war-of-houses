import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { GlobalConfig } from '../shared/config.model'
import { TokenManager } from './token-manager.service';
import 'rxjs/add/operator/map';

@Injectable()

export class UserService {
  _url: string;
  constructor( private http: Http, private _tokenmanager: TokenManager) { 
    this._url = GlobalConfig.BASE_API_URL;
  }

  authenticate(fb_access_token: string){
    return this.http.post(this._url +'api/authenticate', {'access_token': fb_access_token})
    .map(res => res.json());
  }

  getAllUsers(){
    let headers = new Headers();
    this._tokenmanager.createAuthorizationHeader(headers);

  	return this.http.get(this._url +'user', {headers: headers})
  	.map(res => res.json());
  }

  registerUser(user){
		return this.http.post(this._url +'user', user)
  		.map(res => res.json());
  }

  updateUserEvent(user){
    let headers = new Headers();
    this._tokenmanager.createAuthorizationHeader(headers);

    let url = this._url +"user/events/"+user.ec_id;
    return this.http.put(url, user, {headers:headers})
      .map(res => res.json());
  }
}
