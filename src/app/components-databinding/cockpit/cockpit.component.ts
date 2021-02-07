import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

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

  @ViewChild("serverContentInput") serverContentInput: ElementRef;
  // @ViewChild(CockpitComponent) serverContentInput; <- this would return the reference to the first found Component

  constructor() { }

  ngOnInit() {
  }

  onAddServer(nameInput: HTMLInputElement) {
    // console.log(nameInput.value);
    // console.log(this.serverContentInput); <- Element Ref
    this.serverCreated.emit({ serverName: nameInput.value, serverContent: this.serverContentInput.nativeElement.value});
  }

  onAddBlueprint(nameInput: HTMLInputElement) {
    this.blueprintCreated.emit({ blueprintName: nameInput.value, blueprintContent: this.serverContentInput.nativeElement.value});
  }
}
