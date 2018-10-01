import { Component, OnInit, NgZone } from '@angular/core';
import { IS_ELECTRON } from 'app/references/is-electron';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  constructor(private zone: NgZone, private router: Router) {}

  ngOnInit(): void {
    if (IS_ELECTRON) {
      window['ipc'].on('quit-application', () => {
        this.zone.run(() => this.router.navigate(['/quit']));
      });
    }
  }
}
