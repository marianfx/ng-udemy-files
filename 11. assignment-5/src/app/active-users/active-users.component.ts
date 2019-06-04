import { Component, Input } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent {
  @Input() users: string[];

  constructor(private userService: UsersService) {}

  onSetToInactive(id: number) {
    this.userService.setUserInactive(id);
  }
}
