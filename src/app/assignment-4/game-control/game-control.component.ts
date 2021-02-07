import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {

  theInterval: any;
  currentNumber: number = 0;
  gameRunning: boolean = false;

  // events
  @Output() onGameTriggered = new EventEmitter<number>();
  @Output() onGameStarted = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onStartGame() {
    this.gameRunning = true;
    this.currentNumber = 0;
    this.onGameStarted.emit();
    this.theInterval = setInterval(() => {
      this.onGameTriggered.next(++this.currentNumber);
    }, 1000);
  }

  onStopGame() {
    this.gameRunning = false;
    clearInterval(this.theInterval);
  }
}
