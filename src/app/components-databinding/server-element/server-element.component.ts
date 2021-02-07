import { Component, OnInit, Input, OnChanges, SimpleChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy, ViewChild, ElementRef, ContentChild } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  // encapsulation: ViewEncapsulation.Emulated // the default behavior; the styles applied only for this component
  // encapsulation: ViewEncapsulation.Native // same as emulated, but with natural browser ShadowDom usage (only for compatible browsers)
  // encapsulation: ViewEncapsulation.None // no encapsulation => styles applied globally
})
export class ServerElementComponent implements OnInit, OnChanges, DoCheck, AfterContentInit,
  AfterContentChecked, AfterViewInit, AfterViewChecked,
  OnDestroy {
  // data binding from parent to child
  @Input("srvElement") // the alias used in the parent accessing the value
  element: { type: string, name: string, content: string};
  @Input() name: string;

  // ViewChild = view from self template
  @ViewChild("headingElement") headingElement: ElementRef;

  // ContentChild = view what has been passed in ng-content
  @ContentChild("theChildParagraph") theChildParagraph: ElementRef;

  constructor() {
    console.log("I'm building myself");
  }

  /**
   * Called only once to initialize the component
   * @memberof ServerElementComponent
   */
  ngOnInit() {
    console.log("I'm initializing my data");
    console.log("Text content: " + this.headingElement.nativeElement.textContent); // no value or error (if not using static: true)
  }

  /**
   * This is called whenever a change is detected.
   * Side note: just declaring the method does the trick, but also 'implementing' the interface is the standard
   */
  ngOnChanges(changes: SimpleChanges) {
    console.log("I feel like I'm changing", changes);
  }

  /**
   * Don't do anything with huge workload here, because it is called a lot.
   * Whenever something is triggered, it must check for changes.
   */
  ngDoCheck() {
    console.log("The master checks for changes");
  }

  /**
   * Called only once after the 'content' has finished initializing
   */
  ngAfterContentInit() {
    console.log("The content has finished initializing");
  }

  /**
   * Called after each DoCheck. Starts being called after content has finished initializing.
   *
   * @memberof ServerElementComponent
   */
  ngAfterContentChecked() {
    console.log("The content has finished being checked");
  }

  /**
   * Called only once, after the view has been rendered
   */
  ngAfterViewInit() {
    console.log("The view has finished initializing");
    console.log("Text content after view init: " + this.headingElement.nativeElement.textContent); // has value & access to element
    console.log("Text child paragraph content after view init: " + this.headingElement.nativeElement.textContent); // has value & access to element
  }

  /**
   * Called after the view has been checked for changes. Starts being called after view has finished initializing.
   *
   * @memberof ServerElementComponent
   */
  ngAfterViewChecked() {
    console.log("The view has finished being checked");
  }

  ngOnDestroy() {
    console.log("I died, I am no more");
  }
}
