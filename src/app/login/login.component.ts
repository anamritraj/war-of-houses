import { Component, OnInit } from '@angular/core';
import {FacebookService, FacebookAuthResponse, FacebookLoginResponse, FacebookLoginStatus} from '../services/facebook.service'
import { TokenManager} from '../services/token-manager.service';
import { UserService } from '../services/user.service';
import { User } from '../shared/user.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [FacebookService, TokenManager, UserService]
})
export class LoginComponent implements OnInit {

	userAccessToken: string;
	user = new User();
  
  constructor(private _facebookService:FacebookService, private _tokenManager: TokenManager, private _userService: UserService) { }

  ngOnInit() {
    // Check if the user has a valid access token in his browser.
    this._facebookService.init();    
  	this._facebookService.getLoginStatus().then((resp) =>{
  		console.log(resp);
  		if (resp.status == 'connected') {
      // connect here with your server for facebook login by passing access token given by facebook
	      console.log('User is already connected with facebook. Now lets see if he is in the database!');
	      this.authenticate(resp.authResponse.accessToken).then((res) =>{

	      },(error) => {

	      });
	    }else if(resp.status == 'not_authorized') {
	    	console.log("not_authorized");
	      // Delete any garbage cookies
	      // this.unSetToken();
	      //  You must authorize before you can continue
	      // this.RegisterButtonClick();
	    }else{
	      // Delete any garbage cookies
	      // this.unSetToken();
	      console.log("Unkonown Status");
	      this._facebookService.login().then((response: FacebookLoginResponse) => {
	        // this.statusChangeCallback(response); 
	      }, (error) => {
	        console.log(error);
	      });
	    }
  	});

  }
	authenticate(fb_token: string): Promise<any>{
    return new Promise<any>((resolve, reject) =>{
    	this._userService.authenticate(fb_token).subscribe((res) => {
    		if(res.token) {
    			resolve(res.token);
    		}else{
    			reject(null);
    		}
    	}, (error) =>{
    		var err = JSON.parse(error._body);
    		reject(err);
    		if(err.error == "invalid_credentials") {
    			console.log('Token ok, user is not in database.');
    			//TODO: Show him the registration form
    		}else if(err.error == "access_token_invalid"){
    			console.log('Token is invalid');
    			// TODO: Show him the login form

    		}
    	});
    });
  }



  alreadyLoggedIn(): Promise<any>{
    return new Promise<any>((resolve, reject) =>{

    });
  }
}
