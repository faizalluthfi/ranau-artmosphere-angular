import { Component, OnInit, NgZone } from '@angular/core';
import { IS_ELECTRON } from 'app/references/is-electron';
import { Router } from '@angular/router';
import { AppService } from './services/app.service';
import { NotificationService } from './services/notification.service';

declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  constructor(
    private zone: NgZone,
    private router: Router,
    private service: AppService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    if (IS_ELECTRON) {
      window['ipc'].on('quit-application', () => {
        this.zone.run(() => this.router.navigate(['/quit']));
      });
      let clientSettings = this.service.loadClientSettings();
      if (clientSettings.printer_path) {
        this.service.sendToIpc('init-printer', clientSettings.printer_path);
      }
    }
    this.service.handleIpcEvents([
      ['backup-succeed', () => {
        this.notificationService.setNotification('Pencadangan data berhasil.', 'success');
      }],
      ['error', message => {
        this.notificationService.setNotification(message, 'error');
      }],
    ]);
  }
}
