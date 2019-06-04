import { EventEmitter } from "@angular/core";

export class CounterService {
  activeToInactive: number = 0;
  inactiveToActive: number = 0;

  onInactiveChanged = new EventEmitter<number>();
  onActiveChanged = new EventEmitter<number>();

  raiseActiveInactive() {
    this.activeToInactive++;
    this.onInactiveChanged.emit(this.activeToInactive);
  }

  raiseInactiveActive() {
    this.inactiveToActive++;
    this.onActiveChanged.emit(this.inactiveToActive);
  }
}
