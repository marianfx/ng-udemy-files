import { Component, OnInit } from '@angular/core';

@Component({
  // selector: '[app-servers]', use with <div app-servers>; used for directives
  // selector: '.app-servers', use with <div;class=".app-servers">; ID doesn't work
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServers = false;
  serverCreationStatus = "No server created.";
  serverName = "Test server";

  constructor() { 
    setTimeout(() => {
      this.allowNewServers = true;
    }, 2000)
  }

  ngOnInit() {
  }

  onCreateServer() {
    this.serverCreationStatus = "Server was created! New name: " + this.serverName;
  }

  onUpdateServerName(event: Event) {
    this.serverName = (<HTMLInputElement>event.target).value;
  }

}
