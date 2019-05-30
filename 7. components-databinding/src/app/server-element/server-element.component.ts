import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit {
  // data binding from parent to child
  @Input("srvElement") // the alias used in the parent accessing the value
  element: { type: string, name: string, content: string};


  constructor() { }

  ngOnInit() {
  }

}
