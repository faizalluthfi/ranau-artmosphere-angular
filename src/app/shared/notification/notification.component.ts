import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'app/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor(private service: NotificationService) { }

  ngOnInit() {
    let icons = {
      info: 'ti-belt',
      success: 'ti-face-smile',
      warning: 'ti-alert',
      danger: 'ti-face-said'
    };
    this.service.notification
      .subscribe(notification => {
        window['$'].notify({
          icon: icons[notification.type],
          message: notification.message
    
        },{
            type: notification.type,
            timer: 4000,
            placement: {
                from: 'top',
                align: 'right'
            }
        });
      });
  }

}
