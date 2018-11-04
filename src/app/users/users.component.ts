import { Component, OnInit } from '@angular/core';
import { User } from 'app/classes/user';
import { Subscription } from 'rxjs';
import { UsersService } from 'app/services/users.service';
import { ActivatedRoute } from '@angular/router';
import { ROLES } from 'app/references/roles';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[];
  subscriptions: Subscription[] = [];
  ROLES = ROLES;

  constructor(private usersService: UsersService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.subscriptions = this.subscriptions.concat([
      this.usersService.users.subscribe(users => {
        this.users = users;
      })
    ]);
    this.usersService.getUsers();
  }

}
