import { Injectable } from '@angular/core';

@Injectable()

export class TokenManager{
  constructor (){ }

  private tokenKey:string = 'user_token';

  public store(content: string) {
    localStorage.setItem(this.tokenKey, content);
  }

  public retrieve(): string{
    let storedToken:string = localStorage.getItem(this.tokenKey);
    return storedToken;
  }

  public deleteToken(){
    localStorage.setItem(this.tokenKey, null);
  }
}
