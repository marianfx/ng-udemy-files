import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  // encapsulation: ViewEncapsulation.Emulated // the default behavior; the styles applied only for this component
  // encapsulation: ViewEncapsulation.Native // same as emulated, but with natural browser ShadowDom usage (only for compatible browsers)
  // encapsulation: ViewEncapsulation.None // no encapsulation => styles applied globally
})
export class ServerElementComponent implements OnInit {
  // data binding from parent to child
  @Input("srvElement") // the alias used in the parent accessing the value
  element: { type: string, name: string, content: string};


  constructor() { }

  ngOnInit() {
  }

}
