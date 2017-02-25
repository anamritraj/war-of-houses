import { Component, OnInit } from '@angular/core';
import {GameUserService} from "../services/game-user.service";

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  page: number;
  leaderboardObjects = [];
  constructor(
    private _gameService: GameUserService
  ) {
    this.page = 1;
  }

  ngOnInit() {
    this._gameService.getBriefLeaderboard(this.page = 1).subscribe(result => {
      console.log(result);
      this.leaderboardObjects = result;
    },error =>{
      console.log(error);
    })
  }

}
