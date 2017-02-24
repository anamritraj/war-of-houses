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
  //can Train
  canTrainArmy: boolean;
  canTrainGiant: boolean;
  canTrainDragons: boolean;
  canTrainWall: boolean;
  canTrainWorker: boolean;

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
    // Create Worker
    // Train Army
    this._gameService.createWorker().subscribe(res => {

      this.user.food = res.food;
      this.user.gold = res.gold;
      this.user.wood = res.wood;
      this.user.workers = res.workers;
      this.user.last_worker = res.last_worker;
    },err =>{
      if (err.status != 406) {
        this._router.navigate(['/login']);
      } else {
        this.canTrainWorker = false;
        let notification = {
          type: "info",
          message: 'You cannot create Worker now! You don\'t have the resources!',
          title: "Hold your horses mate!",
          showNotification: true
        };
        this.notification.emit(notification)
      }
    });

  }

  train(type){
    switch (type){
      case 1:
        // Train Army
        this._gameService.trainArmy().subscribe(res => {

          this.user.food = res.food;
          this.user.gold = res.gold;
          this.user.wood = res.wood;
          this.user.attack = res.attack;
          this.user.defence = res.defence;
          this.user.overall_points = res.overall_points;
          this.user.army = res.army;
        },err =>{
          if(err.status == 406){
            this.canTrainArmy = false;
            let notification = {type: "info", message: 'You cannot Train Army now! You don\'t have the resources!', title: "Hold your horses mate!", showNotification: true};
            this.notification.emit(notification)
          }else{
            this._router.navigate(['/login']);
          }
        });
        break;
      case 2:
        // Train Giant
        this._gameService.trainGiant().subscribe(res => {

          this.user.food = res.food;
          this.user.gold = res.gold;
          this.user.wood = res.wood;
          this.user.attack = res.attack;
          this.user.defence = res.defence;
          this.user.overall_points = res.overall_points;
          this.user.giants = res.giants;
        },err =>{
          if(err.status == 406){
            this.canTrainGiant = false;
            let notification = {type: "info", message: 'You cannot Train Giant now! You don\'t have the resources!', title: "Hold your horses mate!", showNotification: true};
            this.notification.emit(notification)
          }else{
            this._router.navigate(['/login']);
          }
        });
        break;
      case 3:
        // Train Wall
        this._gameService.trainWall().subscribe(res => {

          this.user.food = res.food;
          this.user.gold = res.gold;
          this.user.wood = res.wood;
          this.user.attack = res.attack;
          this.user.defence = res.defence;
          this.user.overall_points = res.overall_points;
          this.user.wall = res.wall;
        },err =>{
          if(err.status == 406){
            this.canTrainWall = false;
            let notification = {type: "info", message: 'You cannot Train Wall now! You don\'t have the resources!', title: "Hold your horses mate!", showNotification: true};
            this.notification.emit(notification);
          }else{
            this._router.navigate(['/login']);
          }
        });
        break;
      case 4:
        // Train Dragon
        this._gameService.trainDragon().subscribe(res => {

          this.user.food = res.food;
          this.user.gold = res.gold;
          this.user.wood = res.wood;
          this.user.attack = res.attack;
          this.user.defence = res.defence;
          this.user.overall_points = res.overall_points;
          this.user.dragons = res.dragons;
        },err =>{
          if(err.status == 406){
            this.canTrainDragons = false;
            let notification = {type: "info", message: 'You cannot Train Dragons now! You don\'t have the resources!', title: "Hold your horses mate!", showNotification: true};
            this.notification.emit(notification);
          }else{
            this._router.navigate(['/login']);
          }
        });
        break;
    }
    return;
  }

  increaseWorker(type: number){
    this._gameService.increaseWorker(type).subscribe(res => {
      console.log(res);
      this.user.workers = res.workers;
      switch (type){
        case 1:
          this.user.food_x = res.food_x;
          break;
        case 2:
          this.user.gold_x = res.gold_x;
          break;
        case 3:
          this.user.wood_x = res.wood_x;
          break;
      }
    }, error => {
      console.log(error);
    })
  }

  decreaseWorker(type: number){
    this._gameService.decreaseWorker(type).subscribe(res => {
      console.log(res);
      this.user.workers = res.workers;
      switch (type){
        case 1:
          this.user.food_x = res.food_x;
          break;
        case 2:
          this.user.gold_x = res.gold_x;
          break;
        case 3:
          this.user.wood_x = res.wood_x;
          break;
      }
    }, error => {
      console.log(error);
    })

  }
}
