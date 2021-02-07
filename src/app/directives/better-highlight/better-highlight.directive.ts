import { Directive, Renderer2, OnInit, ElementRef, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {

  @Input() defaultColor: string = "transparent";
  @Input() highlightColor: string = "green";
  // @Input() appBetterHighlight: string = "green"; <- this would mean we can use the directive's name as [](input)

  // bind to a property of the hosting elements (element that this directive is on); can use sub-props
  @HostBinding("style.backgroundColor") backgroundColor: string = this.defaultColor;
  @HostBinding("style.color") textColor: string = "black";

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    // this.renderer.setStyle(this.elementRef.nativeElement, "background-color", "blue");
  }

  // browser events
  @HostListener("mouseenter") onMouseOver(eventData: Event) {
    // this.renderer.setStyle(this.elementRef.nativeElement, "background-color", "blue");
    this.backgroundColor = this.highlightColor;
    this.textColor = "white";
  }

  // browser events
  @HostListener("mouseleave") onMouseOut(eventData: Event) {
    // this.renderer.setStyle(this.elementRef.nativeElement, "background-color", "transparent");
    this.backgroundColor = this.defaultColor;
    this.textColor = "black";
  }
}
