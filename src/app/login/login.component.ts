import { Component, OnInit } from '@angular/core';
import {FacebookService, FacebookAuthResponse, FacebookLoginResponse, FacebookLoginStatus} from '../services/facebook.service'
import { TokenManager} from '../services/token-manager.service';
import { UserService } from '../services/user.service';
import { GameUserService } from '../services/game-user.service';
import { User } from '../shared/user.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [FacebookService, TokenManager, UserService, GameUserService]
})
export class LoginComponent implements OnInit {

	userAccessToken: string;

	showLoginForm: boolean;
	loginError: string;
	showRegisterForm: boolean;

	user = new User();
  
  constructor(
  	private _facebookService:FacebookService, 
  	private _tokenManager: TokenManager, 
  	private _userService: UserService,
  	private _gameUserService: GameUserService,
  	) { }

  ngOnInit() {
    // Check if the user has a valid access token in his browser.
		// Get Access token from Local Storgae.
		this.userAccessToken = this._tokenManager.retrieve();

		this._gameUserService.getGameUser().subscribe((res) =>{
			console.log(res);
			if(!res.ec_id){
				// User is not registered for the game
				this.show_RegisterForm();
			}else{
				this.user = res;
				console.log(this.user);
			}

		}, (error)=>{
			this.doFacebookLogin().then((r)=>{
				this._gameUserService.getGameUser().subscribe((result) => {
					console.log(result);
				},(error) => {
					console.log("Something very wrong has happened. Call inform guy: +91 8463826679. He knows what to do.")
				})		
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
    		var err = JSON.parse(error._body);
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
		      	if(res) resolve(true);
		      }, (err)=>{
		      	reject(err);
		      });
		    }else if(resp.status == 'not_authorized') {
		    	console.log("not_authorized");
	  			this.show_LoginForm("invalid_credentials");
		    }else{
		      console.log("Unkonown Status");
	  			this.show_LoginForm("invalid_credentials");
		    }
	  	});
	  })
  };

  show_RegisterForm(){
  	this.showRegisterForm = true;
  	this.showLoginForm = false;
  	console.log("Register form shown");
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
	  		if(error.error == "invalid_credentials") {
	  			console.log('Token ok, user is not in database.');
	  			resolve(true);
	  		}else if(error.error == "access_token_invalid"){
	  			console.log('Token is invalid');
	  			resolve(true);
	  		}
	  		this.show_LoginForm(error.error);
	    });
	    // reject("Unknown Error Occured in getNewJWTToken() reject");
	  })
  };

  alreadyLoggedIn(): Promise<any>{
  	  return new Promise<any>((resolve, reject) =>{
	  });
  }
}
