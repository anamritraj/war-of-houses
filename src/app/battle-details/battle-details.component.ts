import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {User} from "../shared/user.model";
import {Router} from "@angular/router";
import {GameUserService} from "../services/game-user.service";
import {CHARACTERS} from "../shared/characters.model";

@Component({
  selector: 'app-battle-details',
  templateUrl: './battle-details.component.html',
  styleUrls: ['./battle-details.component.css'],
  providers: [GameUserService]
})
export class BattleDetailsComponent implements OnInit {
  @Input() user: User;
  @Output() notification = new EventEmitter();
  CHARACTERS:any = CHARACTERS;
  next_food_refresh : string;
  next_wood_refresh : string;
  next_gold_refresh : string;
  next_turn_refresh : string;
  next_worker_refresh : string;
  constructor(
    private _gameService: GameUserService,
    private _router: Router
  ) {
  }

  ngOnInit() {

  }

  claim(type: number){
    this.hideNotification();
    switch (type){
      case 1:
        // Update Food!
        this._gameService.claimFood().subscribe((res) => {
          this.user.food = res.food;
          this.next_food_refresh = res.next_food_at;
        }, (err) => {
          if(err.status == 406){
            let notification = {type: "info", message: 'You cannot claim Food now!', title: "Hold your horses mate!", showNotification: true};
            this.showNotification(notification);
            this.next_food_refresh = err.json().next_food_at;
          }else{
            this._router.navigate(['/login']);
          }
        });

        break;
      case 2:
        // Update Gold!
        this._gameService.claimGold().subscribe((res) => {

          this.user.gold = res.gold;
          this.next_gold_refresh = res.next_gold_at;

        }, (err) => {
          if(err.status == 406){
            console.log('You cannot claim now!');
            this.next_gold_refresh = err.json().next_gold_at;
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
          this.next_wood_refresh = res.next_wood_at;
        }, (err) => {
          if(err.status == 406){
            console.log('You cannot claim now!');
            this.next_wood_refresh = err.json().next_wood_at;
            this.notification.emit({type: "danger", message: 'You cannot claim Wood now!', title: "Hold your horses mate!", showNotification: true})

          }else{
            this._router.navigate(['/login']);
          }
        });
        break;

      case 4:
        // Update Turns!
        this._gameService.claimTurns().subscribe((res) => {
          this.next_turn_refresh = res.next_turn_at;
          this.user.turns = res.turns;
        }, (err) => {
          if(err.status == 406){
            console.log('You cannot claim now!');
            this.next_turn_refresh = err.json().next_turn_at;

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
    this.hideNotification();
    this._gameService.createWorker().subscribe(res => {

      this.user.food = res.food;
      this.user.gold = res.gold;
      this.user.wood = res.wood;
      this.user.workers = res.workers;
      this.user.last_worker = res.last_worker;
      this.next_worker_refresh = res.next_worker_at;

    },err =>{
      if (err.status != 406) {
        this._router.navigate(['/login']);
      } else {
        this.next_worker_refresh = err.json().next_worker_at;
        let notification = {
          type: "info",
          message: 'You cannot create Worker now! It\'s not the right time yet!',
          title: "Hold your horses mate!",
          showNotification: true
        };
        this.showNotification(notification);
      }
    });

  }

  train(type){
    this.hideNotification();
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
            let notification = {type: "info", message: 'You cannot Train Army now! You don\'t have the resources!', title: "Hold your horses mate!", showNotification: true};
            this.showNotification(notification);
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
            let notification = {type: "info", message: 'You cannot Train Giant now! You don\'t have the resources!', title: "Hold your horses mate!", showNotification: true};
            this.showNotification(notification);
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
            let notification = {type: "info", message: 'You cannot Train Wall now! You don\'t have the resources!', title: "Hold your horses mate!", showNotification: true};
            this.showNotification(notification);
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
            let notification = {type: "info", message: 'You cannot Train Dragons now! You don\'t have the resources!', title: "Hold your horses mate!", showNotification: true};
            this.showNotification(notification);
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
      this._router.navigate(['/login'])
;    })

  }


  showNotification(notification){
    this.notification.emit(notification);
  }

  hideNotification(){
    let notification = {
      showNotification : false
    };
    this.notification.emit(notification);
  }
}
