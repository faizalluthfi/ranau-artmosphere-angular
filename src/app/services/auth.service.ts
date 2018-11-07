import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from 'app/classes/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly session: Subject<User> = new Subject<User>();
  readonly error: Subject<String> = new Subject<String>();
  redirectURL: String;

  login(user: User) {
    return new window['Users']()
      .query(qb => {
        qb
          .where('name', user.name)
          .where('password', user.password)
          .whereNull('deleted')
      })
      .fetch()
      .then(result => {
        if (result) {
          let user = result.toJSON();
          this.updateUser(user);
          return user;
        }
        this.error.next('Username and password salah.')
        this.logout();
        return null;
      });
  }

  logout() {
    this.updateUser();
  }

  updateUser(user: User = null) {
    let newUserData = user;
    if (user) {
      newUserData = Object.assign({}, this.user);
      Object.assign(newUserData, user);
    }
    this.session.next(newUserData);
    if (user) sessionStorage.setItem('user', JSON.stringify(newUserData));
    else sessionStorage.removeItem('user');
  }

  get user(): User {
    let storage = sessionStorage.getItem('user');
    let user = storage ? JSON.parse(storage) : null;
    return user;
  }
}
