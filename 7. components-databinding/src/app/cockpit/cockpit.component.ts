import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  // here we create event emitters (they generate output); they can as well have aliases
  @Output()
  serverCreated = new EventEmitter<{ serverName: string, serverContent: string }>();
  @Output()
  blueprintCreated = new EventEmitter<{ blueprintName: string, blueprintContent: string }>();

  newServerName = '';
  newServerContent = '';
  constructor() { }

  ngOnInit() {
  }

  onAddServer() {
    this.serverCreated.emit({ serverName: this.newServerName, serverContent: this.newServerContent});
  }

  onAddBlueprint() {
    this.blueprintCreated.emit({ blueprintName: this.newServerName, blueprintContent: this.newServerContent});
  }
}
