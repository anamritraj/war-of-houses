import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import DateTimeFormat = Intl.DateTimeFormat;
import {Observable} from "rxjs";

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.css']
})
export class CountdownTimerComponent implements OnChanges{

  @Input() time: string;
  futureTime : Date;
  private diff:any;
  message : any;
  constructor() { }

  countdown(t){
    if(t < 0){
      return "Claim Now!";
    }
    let hours, minutes, seconds;
    hours = Math.floor(t / 3600) % 24;
    t -= hours * 3600;
    minutes = Math.floor(t / 60) % 60;
    t -= minutes * 60;
    seconds = t % 60;

    return [
      hours + 'h',
      minutes + 'm',
      seconds + 's'
    ].join(' ');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.time);
    if(this.time){
      this.futureTime = new Date(this.time);
      console.log(this.futureTime);

      Observable.interval(1000).map((x) => {
        this.diff = Math.floor((this.futureTime.getTime() - new Date().getTime()) / 1000);
      }).subscribe((x) => {
        this.message = this.countdown(this.diff);
      });
    }else{
      this.message = "";
    }
  }

}
