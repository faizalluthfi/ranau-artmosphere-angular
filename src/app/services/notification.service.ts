import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Notification } from 'app/classes/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  readonly notification:Subject<Notification> = new Subject<Notification>();
  readonly notificationPermission:Subject<string> = new Subject<string>();
  readonly requestPermission:Subject<boolean> = new Subject<boolean>();

  setNotification(message:string, type:string = 'info') {
    let types = ['info', 'success', 'warning', 'danger'];
    if (types.includes(type)) {
      this.notification.next(
        new Notification({
          message: message,
          type: type
        })
      );
    }
  }
}
