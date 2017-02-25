import { Component, OnInit } from '@angular/core';
import {User} from "../shared/user.model";
import {GameUserService} from "../services/game-user.service";
import {TokenManager} from "../services/token-manager.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [GameUserService, TokenManager]
})
export class ProfileComponent implements OnInit {

  user = new User();
  notificationTitle: string;
  notificaitonBody: string;
  notificationType: string;
  viewNotification: boolean;
  constructor(
    private _gameUserService: GameUserService,
    private _router: Router,
  ){}

  ngOnInit() {

    this._gameUserService.getGameUser().subscribe((res) =>{
      console.log(res);
      if(res.house_name){
        console.log(res);
        this.user = res;
      }else{
        this._router.navigate(['/login']);
      }
    },(error) =>{
      console.log(error);
      this._router.navigate(['/login']);
    });
  }
  onAttack(attackDetails){
      this.hideNotification();
      if(attackDetails.success == true){
        this.notificationTitle = "Your won the battle! You gained "+ attackDetails.food_damage
          +" Food, "+attackDetails.gold_damage+" Gold and "+ attackDetails.wood_damage+" Wood!";
        this.notificaitonBody = "Success!!!";
        this.notificationType = "success";
        this.viewNotification = true;
      }else{
        this.notificationTitle = "Your lost the battle!!";
        this.notificaitonBody = "You failed!";
        this.notificationType = "warning";
        this.viewNotification = true;
      }
    this.user = attackDetails.user;
  }

  showNotification(noti){
      console.log(noti);
      this.notificationTitle = noti.message;
      this.notificaitonBody = noti.title;
      this.notificationType = noti.type;
      this.viewNotification = true;
  }

  hideNotification() {
      this.viewNotification = false;
      console.log("hiden");
  }
  }
