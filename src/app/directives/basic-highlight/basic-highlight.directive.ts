import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
    selector: "[appBasicHighlight]" // camelCaseName; will be used as attribute (brackets)
})
export class BasicHighlightDirective implements OnInit {

    constructor(private elementRef: ElementRef) {
    }

    ngOnInit() {
        this.elementRef.nativeElement.style.backgroundColor = 'green';
    }
}