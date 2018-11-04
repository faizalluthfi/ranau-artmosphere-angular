import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { User } from 'app/classes/user';
import { Subscription } from 'rxjs';
import { ROLES } from 'app/references/roles';
import { UserService } from 'app/services/user.service';
import { NotificationService } from 'app/services/notification.service';
import { AuthService } from 'app/services/auth.service';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnDestroy {
  form: FormGroup;
  user: User;
  error: String;
  subscriptions: Subscription[] = [];
  ROLES = ROLES;

  constructor(
    formBuilder: FormBuilder,
    private service: UserService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private zone: NgZone
  ) {
    let password = new FormControl('');
    let passwordConfirm = new FormControl('', CustomValidators.equalTo(password));
    this.form = formBuilder.group({
      name: [null, Validators.required],
      password: password,
      password_confirmation: passwordConfirm
    });
  }

  ngOnInit() {
    this.subscriptions = [
      this.service.error.subscribe(error => this.error = error),
      this.form.valueChanges.subscribe(() => this.error = null)
    ];
    this.service.getUser(this.authService.user.id).then(user => {
      this.user = user;
      this.form.patchValue(user);
      this.form.markAsPristine();
      this.form.updateValueAndValidity();
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  submit() {
    this.service.updateUser(this.user.id, this.form.value)
      .tap(user => this.userAfterSave(user));
  }

  private userAfterSave(user: User) {
    this.zone.run(() => {
      if (user) {
        this.authService.updateUser(user);
        this.form.reset();
        this.form.patchValue(user);
        this.form.markAsPristine();
        this.notificationService.setNotification(
          `Profil berhasil diperbarui.`,
          'success'
        );
      }
    })
  }

}
