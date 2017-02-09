import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { GlobalConfig } from '../shared/config.model'
import { TokenManager } from './token-manager.service';
import 'rxjs/add/operator/map';

@Injectable()

export class GameUserService {
  _url: string;
  _token: string;
  constructor( private http: Http, private _tokenmanager: TokenManager) { 
    this._url = GlobalConfig.BASE_API_URL;
    this._token = "?token=" + this._tokenmanager.retrieve();
  }

  getGameUser(){
  	return this.http.get(this._url +'api/user'+this._token)
  	.map(res => res.json());
  }
}
