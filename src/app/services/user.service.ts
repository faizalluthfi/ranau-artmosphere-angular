import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly user: Subject<User> = new Subject<User>();
  readonly error: Subject<string> = new Subject<string>();

  getUser(id: number) {
    return window['Users'].where('id', id)
      .fetch()
      .then(result => { return this.sanitizeData(result) });
  }

  createUser(user: User) {
    return new window['Users']()
      .query(qb => {
        qb.where('name', user.name).whereNull('deleted');
      })
      .fetch()
      .then(result => {
        if (result) {
          this.error.next('Username sudah dipakai.');
          return null;
        }
        return new window['Users']()
          .save(user)
          .then(result => { return this.sanitizeData(result) });
      });
  }

  updateUser(id: number, user: User): any {
    let values = Object.assign({}, user);
    delete values.password_confirmation;
    if (!values.password) {
      delete values.password;
    }
    return new window['Users']()
      .query(qb => {
        qb.where('name', user.name)
          .whereNot('id', id)
          .whereNull('deleted');
      })
      .fetch()
      .then(result => {
        if (result) {
          this.error.next('Username sudah dipakai.');
          return null;
        }
        return new window['Users']('id', id)
          .save(values)
          .then(result => { return this.sanitizeData(result) });
      });
  }

  deleteUser(id: number) {
    return new window['Users']('id', id)
      .save({deleted: true})
      .then(result => { return this.sanitizeData(result) });
  }

  private sanitizeData(result: any) {
    let user = result.toJSON();
    delete user.password;
    return user;
  }
}
