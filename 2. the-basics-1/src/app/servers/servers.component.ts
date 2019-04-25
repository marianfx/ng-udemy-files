import { Component, OnInit } from '@angular/core';

@Component({
  // selector: '[app-servers]', use with <div app-servers>; used for directives
  // selector: '.app-servers', use with <div;class=".app-servers">; ID doesn't work
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
