import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  error: String;
  subscriptions: Subscription[] = [];

  constructor(
    formBuilder: FormBuilder,
    private service: AuthService,
    private router: Router,
    private zone: NgZone
  ) {
    this.form = formBuilder.group({
      name: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.service.logout();
    this.subscriptions = [
      this.form.valueChanges.subscribe(() => this.error = null),
      this.service.error.subscribe(error => this.error = error)
    ];
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  login() {
    this.service.login(this.form.value).then(user => {
      this.zone.run(() => {
        if (user) {
          this.router.navigate(['/']);
        }
      })
    });
  }

}
