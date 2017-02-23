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

  constructor(
    private _gameUserService: GameUserService,
    private _router: Router
  ){}

  ngOnInit() {
    this._gameUserService.getGameUser().subscribe((res) =>{
      console.log(res);
      this.user = res;
    },(error) =>{
      this._router.navigate(['/login']);
    });
  }

}
