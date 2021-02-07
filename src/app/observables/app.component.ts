import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './user.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  userActivated: boolean = false;

  emitterSubscription: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.emitterSubscription = this.userService.activatedEmitter.subscribe(activated => this.userActivated = activated);
  }

  ngOnDestroy(): void {
    this.emitterSubscription.unsubscribe();
  }
}
