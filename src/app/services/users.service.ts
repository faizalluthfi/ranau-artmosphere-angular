import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from 'app/classes/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  readonly users: Subject<User[]> = new Subject<User[]>();

  constructor() { }

  getUsers() {
    return new window['Users']()
      .where('deleted', null)
      .orderBy('name')
      .fetchAll()
      .then(result => {
        const users = result.toJSON();
        this.users.next(users);
        return users;
      });
  }
}
