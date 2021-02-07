import { Component, Input } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent {
  @Input() users: string[];

  constructor(private userService: UsersService) {}

  onSetToActive(id: number) {
    this.userService.setUserActive(id);
  }
}
