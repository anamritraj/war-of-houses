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
  showUserCard: boolean;

  constructor(
    private _gameUserService: GameUserService,
    private _router: Router,
  ){
    this.showUserCard = true;
  }

  ngOnInit() {

    this._gameUserService.getGameUser().subscribe((res) =>{
      if(res.house_name){
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
        this.notificationTitle = "You dealt "+attackDetails.damage_dealt+" damage and took "+ attackDetails.attack_taken+" damage! You gained "+ attackDetails.food_damage
          +" Food, "+attackDetails.gold_damage+" Gold and "+ attackDetails.wood_damage+" Wood!";
        this.notificaitonBody = "Your won the battle!! ";
        this.notificationType = "success";
        this.viewNotification = true;
      }else{
        this.notificationTitle = "You dealt "+attackDetails.damage_dealt+" damage and took "+ attackDetails.attack_taken+" damage!";
        this.notificaitonBody = "You Lost the Battle!!!";
        this.notificationType = "warning";
        this.viewNotification = true;
      }
    this.user = attackDetails.user;
  }

  userCardClick(){
    this.showUserCard = !this.showUserCard;
  }

  showNotification(noti){
      // console.log(noti);
      this.notificationTitle = noti.message;
      this.notificaitonBody = noti.title;
      this.notificationType = noti.type;
      this.viewNotification = true;
  }

  hideNotification() {
      this.viewNotification = false;
      // console.log("hiden");
  }
  }
