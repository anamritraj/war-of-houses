import {Component, OnInit, Input} from '@angular/core';
import DateTimeFormat = Intl.DateTimeFormat;
import {Observable} from "rxjs";

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.css']
})
export class CountdownTimerComponent implements OnInit {

  @Input() time: string;
  futureTime : Date;
  private diff:any;
  message : any;
  constructor() { }

  countdown(t){
    var hours, minutes, seconds;
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

  ngOnInit() {
    this.futureTime = new Date(this.time);
    Observable.interval(1000).map((x) => {
      this.diff = Math.floor((this.futureTime.getTime() - new Date().getTime()) / 1000);
    }).subscribe((x) => {
      this.message = this.countdown(this.diff);
    });
  }

}
