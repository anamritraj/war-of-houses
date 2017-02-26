import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {GameUserService} from "../services/game-user.service";
import {User} from "../shared/user.model";
import {Router} from "@angular/router";
declare var ga: any;

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  page: number;
  leaderboardObjects = [];

  @Input() currentUser: User;
  @Output() attackDetails = new EventEmitter();
  constructor(
    private _gameService: GameUserService,
    private _router: Router

  ) {
    this.page = 1;
  }

  ngOnInit() {
    this.updateLeaderBoard();
  }

  updateLeaderBoard(){
    this._gameService.getBriefLeaderboard(this.page = 1).subscribe(result => {
      console.log(result);
      this.leaderboardObjects = result;
      // jQuery(".leaderboard li");
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
      if(parseInt(userObject.turns)+ 1 <= this.currentUser.turns)
        userObject.turns = parseInt(userObject.turns)+ 1;
      else
        userObject.turns = this.currentUser.turns;
    }else{
      userObject.turns = 1;
    }
  }

  attackUser(user){
    ga('send', 'pageview', '/attack');
    if(!user.turns){
      user.turns = 1;
    }
    if(user.turns > this.currentUser.turns)
      user.turns = this.currentUser.turns;
    let data = {
      'attackedOn' : user.ec_id,
      'turns': user.turns
    };

    this._gameService.attack(data).subscribe(result => {
      this.currentUser = result.user;
      this.attackDetails.emit(result);
      this.updateLeaderBoard();
    }, error => {
        console.log(error + "Error during attack!")
        this._router.navigate(['/login']);
    })
  }
}
