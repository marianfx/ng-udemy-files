import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-assignment-6',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  subscriptions: { id: number, description: string }[] = [
    { id: 1, description: "Basic" },
    { id: 2, description: "Advanced" },
    { id: 3, description: "Pro" },
  ];
  defaultSubscription = this.subscriptions[0].id;

  isSubmitted = false;
  formData: any = {};
  getKeys = Object.keys;

  @ViewChild("theForm") theForm: NgForm;

  constructor() {}

  onSubmit() {
    this.isSubmitted = true;
    Object.assign(this.formData, this.theForm.value);
    console.log(this.formData);
    this.theForm.reset();
  }
}
