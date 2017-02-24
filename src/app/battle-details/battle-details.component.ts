import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {User} from "../shared/user.model";
import {Router} from "@angular/router";
import {GameUserService} from "../services/game-user.service";

@Component({
  selector: 'app-battle-details',
  templateUrl: './battle-details.component.html',
  styleUrls: ['./battle-details.component.css'],
  providers: [GameUserService]
})
export class BattleDetailsComponent implements OnInit {
  @Input() user: User;
  @Output() notification = new EventEmitter();

  //Can Claim
  canClaimFood: boolean;
  canClaimWood: boolean;
  canClaimGold: boolean;
  canClaimTurns: boolean;



  constructor(
    private _gameService: GameUserService,
    private _router: Router
  ) {
    this.canClaimFood = true;
    this.canClaimGold = true;
    this.canClaimTurns = true;
    this.canClaimWood = true;
  }

  ngOnInit() {
  }

  claim(type: number){
    switch (type){
      case 1:
        // Update Food!
        this._gameService.claimFood().subscribe((res) => {
          console.log(res);
          this.user.food = res.food;
        }, (err) => {
          if(err.status == 406){
            this.canClaimFood = false;
            let notification = {type: "info", message: 'You cannot claim Food now!', title: "Hold your horses mate!", showNotification: true};
            this.notification.emit(notification)
          }else{
            this._router.navigate(['/login']);
          }
        });

        break;
      case 2:
        // Update Gold!
        this._gameService.claimGold().subscribe((res) => {
          console.log(res);
          this.user.gold = res.gold;
        }, (err) => {
          if(err.status == 406){
            this.canClaimGold= false;
            console.log('You cannot claim now!');
            this.notification.emit({type: "warning", message: 'You cannot claim Gold now!', title: "Hold your horses mate!", showNotification: true})
          }else{
            this._router.navigate(['/login']);
          }
        });
        break;
      case 3:
        // Update Wood!
        this._gameService.claimWood().subscribe((res) => {
          console.log(res);
          this.user.wood = res.wood;
        }, (err) => {
          if(err.status == 406){
            this.canClaimWood = false;
            console.log('You cannot claim now!');
            this.notification.emit({type: "danger", message: 'You cannot claim Wood now!', title: "Hold your horses mate!", showNotification: true})

          }else{
            this._router.navigate(['/login']);
          }
        });
        break;

      case 4:
        // Update Turns!
        this._gameService.claimTurns().subscribe((res) => {
          console.log(res);
          this.user.turns = res.turns;
        }, (err) => {
          if(err.status == 406){
            this.canClaimTurns = false;
            console.log('You cannot claim now!');
            this.notification.emit({type: "info", message: 'You cannot claim turns now!', title: "Hold your horses mate!", showNotification: true})
          }else{
            this._router.navigate(['/login']);
          }
        });
        break;
    }
    return;
  }

  createWorker(){
  //  create new worker!
  }

  train(type){
    switch (type){
      case 1:
        // Train Army
        break;
      case 2:
        // Train Artillery
        break;
      case 3:
        // Train Wall
        break;
      case 4:
        // Train Dragon
        break;
    }
    return;
  }

}
