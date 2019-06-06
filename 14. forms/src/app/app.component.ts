import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  questions: {name: string, description: string}[] = [
    {name: "pet", description: "Your first Pet?"},
    { name: "teacher", description: "Your first teacher?"}];
  defaultQuestion = this.questions[0].name;

  genders = ['male', 'female'];
  answer: string = "";

  @ViewChild("theForm") signupForm: NgForm;

  suggestUserName() {
    const suggestedName = 'Superuser';
  }

  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }

  onSubmit() {
    console.log(this.signupForm);
  }
}
