import { Directive, HostListener, HostBinding, ElementRef } from "@angular/core";

@Directive({
  selector: "[appDropdown]"
})
export class DropdownDirective {

  @HostBinding("class.open") isOpen: boolean = false;

  constructor(private elRef: ElementRef) {

  }

  /**
   * Can toggle open only if clicked on element.
   * Toggle close at click anywhere
   * @param {Event} event
   * @memberof DropdownDirective
   */
  @HostListener("document:click", ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
}
