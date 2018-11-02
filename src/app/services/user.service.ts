import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly user: Subject<User> = new Subject<User>();

  getUser(id: number) {
    return window['Users'].where('id', id)
      .fetch()
      .then(result => { return this.sanitizeData(result) });
  }

  createUser(user: User) {
    return new window['Users']()
      .save(user)
      .then(result => { return this.sanitizeData(result) });
  }

  updateUser(id: number, user: User): any {
    return new window['Users']('id', id)
      .save(user)
      .then(result => { return this.sanitizeData(result) });
  }

  deleteUser(id: number) {
    return new window['Users']('id', id)
      .save({deleted: true})
      .then(result => { return this.sanitizeData(result) });
  }

  private sanitizeData(result: any) {
    let user = result.toJSON();
    user.password = null;
    return user;
  }
}
