import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit {
  isLoggedIn = false;
  public user = { name: "xXx" };


  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.user;
  }

}
