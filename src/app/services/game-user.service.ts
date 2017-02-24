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
  }

  setToken(){
    this._token = "?token=" + this._tokenmanager.retrieve();
  }

  getGameUser(){
    this.setToken();
  	return this.http.get(this._url +'api/game/user'+this._token)
  	.map(res => res.json());
  }

  //Claim Functions
  claimFood(){
    this.setToken();
    return this.http.get(this._url +'api/game/claim-food' + this._token)
      .map(res => res.json());
  }

  claimGold(){
    this.setToken();
    return this.http.get(this._url +'api/game/claim-gold' + this._token)
      .map(res => res.json());
  }


  claimWood(){
    this.setToken();
    return this.http.get(this._url +'api/game/claim-wood' + this._token)
      .map(res => res.json());
  }

  claimTurns(){
    this.setToken();
    return this.http.get(this._url +'api/game/claim-turns' + this._token)
      .map(res => res.json());
  }

  //Train Functions
  trainArmy(){
    this.setToken();
    return this.http.get(this._url +'api/game/train-army' + this._token)
      .map(res => res.json());
  }

  trainGiant(){
    this.setToken();
    return this.http.get(this._url +'api/game/train-giant' + this._token)
      .map(res => res.json());
  }

  trainWall(){
    this.setToken();
    return this.http.get(this._url +'api/game/train-wall' + this._token)
      .map(res => res.json());
  }

  trainDragon(){
    this.setToken();
    return this.http.get(this._url +'api/game/train-dragon' + this._token)
      .map(res => res.json());
  }

  register(house_name: string){
    console.log(house_name);
   this.setToken();
    return this.http.post(this._url +'api/game/user'+this._token, { house_name: house_name })
    .map(res => res.json());
  }
}
