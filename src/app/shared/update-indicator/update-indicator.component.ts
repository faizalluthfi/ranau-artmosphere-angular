import { Component, OnInit, NgZone } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { AppService } from 'app/services/app.service';

@Component({
  selector: 'app-update-indicator',
  templateUrl: './update-indicator.component.html',
  styleUrls: ['./update-indicator.component.scss']
})
export class UpdateIndicatorComponent implements OnInit {
  status:string;
  regularlyCheckUpdateSubscribtion: Subscription;
  updateDownloaded: boolean;
  checked:boolean;

  private readonly interval = 600000;

  constructor(private appService: AppService, private zone: NgZone) {}

  ngOnInit() {
    let events = [
      'checking-for-update', 
      'update-available', 
      'update-not-available', 
      'error', 
      'download-progress', 
      'update-downloaded'
    ];
    events.forEach(event => {
      window['autoUpdater'].removeAllListeners(event);
    });
    window['autoUpdater'].on('checking-for-update', () => {
      this.zone.run(() => {
        this.checked = false;
        this.status = 'Memeriksa update';
      });
    });
    window['autoUpdater'].on('update-available', () => {
      this.zone.run(() => {
        this.checked = true;
        this.stopRegularUpdateCheck();
        this.status = 'Update tersedia';
      });
    });
    window['autoUpdater'].on('update-not-available', () => {
      this.zone.run(() => {
        this.checked = true;
        this.status = '';
        this.startRegularUpdateCheck();
      });
    });
    window['autoUpdater'].on('error', () => {
      this.zone.run(() => {
        this.status = this.checked ? 'Update gagal' : 'Gagal memeriksa update'
        this.startRegularUpdateCheck();
      });
    });
    window['autoUpdater'].on('download-progress', progressObj => {
      this.zone.run(() => {
        const status = `Mendownload ${Math.floor(progressObj.percent)}%`;
        console.log(status);
        this.status = status;
        this.updateDownloaded = false;
      });
    });
    window['autoUpdater'].on('update-downloaded', info => {
        this.zone.run(() => {
          this.status = `Versi ${info.version} siap pasang`
          this.updateDownloaded = true;
          let notification = {
            title: 'Update berhasil didownload',
            body: 'Update otomatis dipasang ketika aplikasi dibuka selanjutnya.',
            icon: window['remote'].getGlobal('iconPath')
          }
          new Notification(notification.title, notification);
          this.startRegularUpdateCheck();
        });
    });
    let timedNotification = timer(2000);
    timedNotification.subscribe(() => {
      this.checkForUpdates();
    });
  }

  checkForUpdates() {
    window['autoUpdater'].checkForUpdates();
  }

  startRegularUpdateCheck() {
    this.zone.runOutsideAngular(() => {
      let regularlyCheckUpdate = timer(this.interval);
      this.regularlyCheckUpdateSubscribtion = regularlyCheckUpdate.subscribe(() => this.checkForUpdates());
    });
  }

  stopRegularUpdateCheck() {
    if (this.regularlyCheckUpdateSubscribtion) {
      this.regularlyCheckUpdateSubscribtion.unsubscribe();
    }
  }

  applyUpdate() {
    this.appService.sendToIpc('apply-update');
  }

}
