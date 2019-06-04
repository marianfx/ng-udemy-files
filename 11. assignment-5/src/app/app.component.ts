import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { CounterService } from './services/counter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  activeUsers: string[] = [];
  inactiveUsers: string[] = [];
  activeToInactive: number = 0;
  inactiveToActive: number = 0;

  constructor(private userService: UsersService, private countingService: CounterService) {
  }

  ngOnInit() {
    this.activeUsers = this.userService.activeUsers;
    this.inactiveUsers = this.userService.inactiveUsers;
    this.countingService.onActiveChanged.subscribe((newValue) => this.inactiveToActive = newValue);
    this.countingService.onInactiveChanged.subscribe((newValue) => this.activeToInactive = newValue);
  }
}
