import { Component } from '@angular/core';

@Component({
  selector: 'app-assignment-4',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  oddNumbers: number[] = [];
  evenNumbers: number[] = [];

  onGameStarted() {
    this.oddNumbers = [];
    this.evenNumbers = [];
  }

  onGameTriggered(input: number) {
    if (input % 2 == 0)
      this.evenNumbers.push(input);
    else
      this.oddNumbers.push(input);
  }
}
