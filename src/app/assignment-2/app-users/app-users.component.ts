import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './app-users.component.html',
  styleUrls: ['./app-users.component.css']
})
export class AppUsersComponent implements OnInit {

  userName = "";
  constructor() { }

  ngOnInit() {
  }

  getDisplayText() {
      if (this.userName)
        return this.userName + ", you are awesome!";
      return "";
  }

  onClearUser(event: Event) {
    let value = (<HTMLInputElement>event.target).value; // does nothing
    this.userName = "";
  }

}
