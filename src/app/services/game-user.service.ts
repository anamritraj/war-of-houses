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

  createWorker(){
    this.setToken();
    return this.http.get(this._url +'api/game/create-worker' + this._token)
      .map(res => res.json());
  }

  increaseWorker(type:number){
    this.setToken();
    switch (type){
      case 1: // Food Increment
        return this.http.get(this._url +'api/game/increase-worker/food' + this._token)
          .map(res => res.json());
      case 2: // Gold increment
        return this.http.get(this._url +'api/game/increase-worker/gold' + this._token)
          .map(res => res.json());
      case 3: // Wood increment
        return this.http.get(this._url +'api/game/increase-worker/wood' + this._token)
          .map(res => res.json());

    }
  }
  decreaseWorker(type:number){
    this.setToken();
    switch (type){
      case 1: // Food Increment
        return this.http.get(this._url +'api/game/decrease-worker/food' + this._token)
          .map(res => res.json());
      case 2: // Gold increment
        return this.http.get(this._url +'api/game/decrease-worker/gold' + this._token)
          .map(res => res.json());
      case 3: // Wood increment
        return this.http.get(this._url +'api/game/decrease-worker/wood' + this._token)
          .map(res => res.json());

    }
  }

  getBriefLeaderboard(page: number){
    this.setToken();
    return this.http.get(this._url +'api/game/brief-leaderboard/'+page+this._token)
      .map(res => res.json());
  }
  getRefreshTimes(){
    this.setToken();
    return this.http.get(this._url +'api/game/refresh-times'+this._token)
      .map(res => res.json());
  }

  attack(data){
    this.setToken();
    return this.http.post(this._url +'api/game/attack'+this._token, data)
      .map(res => res.json());
  }

  register(house_name: string){
    this.setToken();
    return this.http.post(this._url +'api/game/user'+this._token, { house_name: house_name })
      .map(res => res.json());
  }
}
