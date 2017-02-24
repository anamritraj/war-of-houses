import { Component, OnInit } from '@angular/core';
import { FacebookService, FacebookAuthResponse } from '../services/facebook.service'
import { TokenManager} from '../services/token-manager.service';
import { UserService } from '../services/user.service';
import { GameUserService } from '../services/game-user.service';
import { Router } from '@angular/router';

import { User } from '../shared/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [FacebookService, TokenManager, UserService, GameUserService]
})
export class LoginComponent implements OnInit {
	showLoginForm: boolean;
	loginError: string;
	showRegisterForm: boolean;
	registerErrors: Object;
	house_name: string;
	user = new User();

  constructor(
  	private _facebookService:FacebookService,
  	private _tokenManager: TokenManager,
  	private _userService: UserService,
  	private _gameUserService: GameUserService,
    private _route: Router
  	)
  {
  	this.registerErrors = {};
  }

  ngOnInit() {
    //Get the access token from the browser and check if he is a valid user.

    this._gameUserService.getGameUser().subscribe((res) =>{
      console.log(res);
      if(Object.keys(res).length == 0 || !res.house_name){
        //User is not registered for the game
        this.show_RegisterForm();
        console.log("Register form shown");
      }else{
        console.log("user already registered!");
        //user is already registered for the game
        this._route.navigate(['/profile']);
      }
		}, (error)=>{
      console.log(error);
      // Access token is invalid. Or the user is not registered! Lets try to get a new Access token.
      /*
        Perform facebook login
        Get fb_access_token
        Send it over to the server.
        Validate the token
        Get New token or Ask user to register on Eclectika Main website.
        Navigate him to his profile.
			*/
			this.doFacebookLogin().then(()=>{
          //the user is now logged in!
          //Lets see i he is registered for the game!
			    this._gameUserService.getGameUser().subscribe((res) => {
            console.log(res);
            if(Object.keys(res).length == 0){
              //User is not registered for the game
              this.show_RegisterForm();
              console.log("Register form shown");
            }else{
              //user is already registered for the game
              console.log("user is already regitered for the game!");
              this._route.navigate(['/profile']);
            }
          },(error) => {
			      console.log(error);
            console.log("Something very wrong has happened. Inform this guy: +91 8463826679. He knows what to do.")
          });
			}, error => {
			  console.log(error);
      })
		})
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
        let err = JSON.parse(error._body);
    		reject(err);
    	});
    });
  }

  /**
   * This function does facebook login and sets a new token if the user is in database. Otherwise it will simply ask the user to register on the main website and then for the game.
   */
  doFacebookLogin(): Promise<any>{
    return new Promise<any>((resolve, reject) =>{
	  	this._facebookService.init();
	  	this._facebookService.getLoginStatus().then((resp) =>{
	  		console.log(resp);
	  		if (resp.status == 'connected') {
	        // connect here with your server for facebook login by passing access token given by facebook
		      console.log('User is already connected with facebook. Now lets see if he is in the database!');
		      // Get a new token and save it.
		      this.getNewJWTToken(resp.authResponse).then((res)=>{
            resolve(true);
		      }, (err)=>{
		      	reject(err);
		      });
		    }else if(resp.status == 'not_authorized') {
		    	console.log("not_authorized");
	  			this.show_LoginForm("invalid_credentials");
	  			resolve(false);
		    }else{
		      console.log("Unknown Status");
	  			this.show_LoginForm("invalid_credentials");
          resolve(false);
		    }
	  	});
	  })
  };

  show_RegisterForm(){
  	this.showRegisterForm = true;
  	this.showLoginForm = false;
  	console.log("Register form shown");
  }

  registerClick(){
  	this.registerErrors = {};
  	this._gameUserService.register(this.house_name).subscribe(res => {
  		// Registration complete!
  		// Now show him his dashboard
      this._route.navigate(['/profile']);
  	}, err => {
  		// there was an error in the form
  		this.registerErrors = JSON.parse(err._body);
  	})
  }

  show_LoginForm(msg:string){
  	if(msg == "invalid_credentials"){
  		this.loginError = "Looks like you are not Registered for Eclectika 2017. Click the button below to register for Eclectika 2017.";
  	}else if(msg == "access_token_invalid"){
  		this.loginError = "Looks like your session expired. Please reload the page.";
  	}else{
  		this.loginError = "Unknown Error!! :O Please drop a messgae to this guy: +91 84638 26679! Trust us he knows what to do.";
  	}
  	this.showLoginForm = true;
  	this.showRegisterForm = false;
  }

  getNewJWTToken(resp: FacebookAuthResponse): Promise<any>{
	  return new Promise<any>((resolve, reject) =>{
	  	console.log("Getting a new JWT Token from the server.")
	  	this.authenticate(resp.accessToken).then((res) =>{
	    	this._tokenManager.store(res);
	  		console.log("JWT Token saved.");
	  		resolve(true);
	    },(error) => {
	  	  console.log(error);
	  		if(error.error == "invalid_credentials") {
	  			console.log('Facebook Token ok, user is not in database. We need to get this user registered First!');
	  			resolve(true);
	  		}else if(error.error == "access_token_invalid"){
	  			console.log('Facebook Token is invalid. Perform login again!');
	  			resolve(true);
	  		}
	  		this.show_LoginForm(error.error);
	    });
	  })
  };

}
