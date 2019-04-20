import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/services/app.service';

@Component({
  selector: 'app-backup-and-restore',
  templateUrl: './backup-and-restore.component.html',
  styleUrls: ['./backup-and-restore.component.scss']
})
export class BackupAndRestoreComponent implements OnInit {
  private _dialogFilters:any;

  constructor(private appService: AppService) {}

  ngOnInit() {
    this._dialogFilters =[
      {
        name: `Backup (*.${window['backupExtension']})`,
        extensions: [window['backupExtension']]
      }
    ];
  }

  backupData() {
    let now = new Date();
    let filename = `pos_${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}_${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`;
    window['dialog'].showSaveDialog({
      title: 'Save the backup file as',
      filters: this._dialogFilters
    }, filename => {
      if(filename) {
        this.appService.sendToIpc('backup', filename);
      }
    });
  }

  restoreData() {
    window['dialog'].showOpenDialog({
      title: 'Open the backup file',
      properties: ['openFile'],
      filters: this._dialogFilters
    }, files => {
      if(files) {
        this.appService.sendToIpc('restore', files.toString());
      }
    });
  }

}
