import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forms-template-driven',
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

  user = {
    username: '',
    email: '',
    question: '',
    answer: '',
    gender: ''
  };
  isSubmitted = false;

  @ViewChild("theForm") signupForm: NgForm;

  suggestUserName() {
    const suggestedName = 'Superuser';

    // how the form looks like; replaces all values
    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ''
    //   },
    //   secret: 'pet',
    //   questionAnswer: '',
    //   gender: 'male'
    // });

    // replace only one value
    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    });
  }

  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }

  onSubmit() {
    this.isSubmitted = true;
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.question = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;
    console.log(this.signupForm);
    this.signupForm.reset();
  }
}
