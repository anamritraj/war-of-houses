import { Injectable } from '@angular/core';
import {  GlobalConfig } from '../shared/config.model'

import 'rxjs/add/operator/map';

declare const FB:any;

@Injectable()

export class FacebookService {
  constructor() {}

  /**
	 * This method is used to initialize and setup the SDK.
	 * @param params
	 */
  init(): void {
		FB.init({
		  appId      : GlobalConfig.APP_ID,
		  xfbml      : true,
		  cookie     : true,  // enable cookies to allow the server to access 
							// the session
		  version    : 'v2.8'
		});
		FB.AppEvents.logPageView();
  }

  /**
	 * This method allows you to determine if a user is logged in to Facebook and has authenticated your app.
	 * @returns {Promise<FacebookLoginStatus>}
	 */
  getLoginStatus(): Promise<FacebookLoginStatus> {
	  return new Promise<FacebookLoginStatus>(
		  (resolve, reject) => {
			  FB.getLoginStatus((response: FacebookLoginStatus) => {
				  if(!response) reject();
				  else resolve(response);
			  });
		  }
	  );
  }

  /**
   * Login the user
   * @param options
   * @returns {Promise<FacebookLoginResponse>}
   */
  login(): Promise<FacebookLoginResponse> {
      return new Promise<FacebookLoginResponse>(
          (resolve, reject) => {
              FB.login((response: FacebookLoginResponse) => {
                  if(response.authResponse) {
                      resolve(response);
                  }else{
                      reject();
                  }
              }, {scope: 'email'});
          }
      );
  }

  /**
     * This method lets you make calls to the Graph API
     * @param path This is the Graph API endpoint path that you want to call.
     * @param method This is the HTTP method that you want to use for the API request.
     * @param params This is an object consisting of any parameters that you want to pass into your Graph API call.
     * @returns {Promise<any>}
     */
    api(path: string, params: any = {}): Promise<any> {
        return new Promise<any>(
            (resolve, reject) => {
                FB.api(path, 'get', params, (response: any) => {
                    if(!response){
                        reject();
                    }else if(response.error){
                        reject(response.error);
                    }else{
                        resolve(response);
                    }
                });
            }
        );
    }
}

export interface FacebookAuthResponse {
	accessToken: string;
	expiresIn: number;
	signedRequest: string;
	userID: string;
}

export interface FacebookLoginStatus {
	status: string;
	authResponse: FacebookAuthResponse;
}


export interface FacebookLoginResponse {
	authResponse: FacebookAuthResponse;
	status: string;
}
