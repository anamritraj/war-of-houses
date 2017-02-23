import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

//Slim Loading Bar Import
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';
import { LoginComponent } from './login/login.component';
import {ProfileComponent} from "./profile/profile.component";


const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
];

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes),
    SlimLoadingBarModule.forRoot()
  ],
	exports: [
		RouterModule, SlimLoadingBarModule
	]
})

export class AppRoutingModule {}
