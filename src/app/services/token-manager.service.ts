import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()

export class TokenManager{
	constructor (private http: Http){ }

	private tokenKey:string = 'user_token';

	public store(content: string) {
        localStorage.setItem(this.tokenKey, JSON.stringify(content));
    }

    public retrieve(): string{
        let storedToken:string = localStorage.getItem(this.tokenKey);
        return storedToken;
    }

    public deleteToken(){
        localStorage.setItem(this.tokenKey, null);
    }

    public createAuthorizationHeader(headers: Headers) {
        let accessToken:string;
        accessToken = this.retrieve().accessToken;

        if(accessToken) {
            headers.append('Authorization', 'Bearer  ' + accessToken);
        }else{
            headers.append('Authorization', 'Bearer  ');
        }
    }

}
