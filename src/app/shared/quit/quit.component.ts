import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/services/app.service';

@Component({
  selector: 'app-quit',
  templateUrl: './quit.component.html',
  styleUrls: ['./quit.component.scss']
})
export class QuitComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.sendToIpc('quit-application');
  }

}
