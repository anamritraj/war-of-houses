
import { environment } from '../../environments/environment';

export const GlobalConfig = {
	BASE_API_URL: getBaseAPIUrl(),
	APP_ID: getAppID()
 };

function getBaseAPIUrl(){
	if(environment.production) {
		return "http://eclectika.org/apiv2/";
	}else{
		return "http://localhost/auth-api/public/";
	}
}

function getAppID(){
	if(environment.production) {
		return "368783520143664"; // Eclectika 2017
	}else{
		return "600482030137703"; //Eclectika Beta 2017
	}
}
