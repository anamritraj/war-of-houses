import {Component, OnInit, Input} from '@angular/core';
import {GameUserService} from "../services/game-user.service";
import {User} from "../shared/user.model";

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  page: number;
  leaderboardObjects = [];
  @Input() currentUser: User;
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

  decreaseTurns(userObject){
    if(userObject.turns && userObject.turns - 1 > 0){
      userObject.turns -= 1;
    }else{
      userObject.turns = 1;
    }
  }

  increaseTurns(userObject){
    if(userObject.turns){
      if(userObject.turns + 1 <= this.currentUser.turns)
        userObject.turns += 1;
      else
        userObject.turns = this.currentUser.turns;
    }else{
      userObject.turns = 1;
    }
  }

  attackUser(user){
    console.log(user);
  //  TODO Perform an attack!
  }
}
