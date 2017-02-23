import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  @Input() message: string;
  @Input() title: string;
  @Input() showNotification: boolean;
  @Input() type: string;

  constructor() { }

  ngOnInit() {
  }

}
