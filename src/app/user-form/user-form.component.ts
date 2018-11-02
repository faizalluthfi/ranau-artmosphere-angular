import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { UsersService } from '../services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { User } from '../classes/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  user: User;
  error: String;
  subscriptions: Subscription[] = [];

  constructor(
    formBuilder: FormBuilder,
    private service: UserService,
    private usersService: UsersService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private zone: NgZone
  ) {
    this.form = formBuilder.group({
      name: [null, Validators.required],
      password: [null],
      role_id: [null]
    });
  }

  ngOnInit() {
    this.subscriptions = [
      this.service.error.subscribe(error => this.error = error),
      this.form.valueChanges.subscribe(() => this.error = null)
    ];
    this.route.params.subscribe(params => {
      this.form.controls.password.clearValidators();
      this.form.reset();
      this.error = null;
      if (params.id) {
        this.service.getUser(params.id).then(user => {
          this.user = user;
          this.form.patchValue(user);
          this.form.markAsPristine();
          this.form.updateValueAndValidity();
        });
      } else {
        this.form.controls.password.setValidators(Validators.required);
        this.form.controls.role_id.setValue(2);
        this.form.markAsPristine();
        this.form.updateValueAndValidity();
        this.user = new User();
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  submit() {
    if (this.user.id) {
      this.service.updateUser(this.user.id, this.form.value)
        .tap(user => this.userAfterSave(user));
      return;
    }
    this.service.createUser(this.form.value)
      .tap(user => this.userAfterSave(user));
  }

  delete() {
    if (window.confirm('Apakah anda yakin akan menghapus user ini?')) {
      this.service.deleteUser(this.user.id)
        .tap(user => this.userAfterSave(user));
    }
  }

  private userAfterSave(user: User) {
    this.zone.run(() => {
      if (user) {
        this.notificationService.setNotification(
          `User berhasil ${user.deleted ? 'dihapus' : 'disimpan'}.`,
          'success'
        );
        this.usersService.getUsers();
        this.router.navigate(['..'], {relativeTo: this.route});
      }
    })
  }

}
