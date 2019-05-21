import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-details',
  templateUrl: './input-details.component.html',
  styleUrls: ['./input-details.component.css']
})
export class InputDetailsComponent implements OnInit {

  isHiddenTextDisplayed = false;
  clicks: Date[] = [];
  constructor() { }

  ngOnInit() {
  }

  onDisplayDetailsToggle() {
    this.isHiddenTextDisplayed = !this.isHiddenTextDisplayed;
    this.clicks.push(new Date());
  }
}
