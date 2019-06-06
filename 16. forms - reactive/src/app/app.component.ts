import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  forbiddenUsernames = ['Chris', 'Anna'];
  signupForm: FormGroup;


  ngOnInit(): void {
    this.signupForm = new FormGroup({
      "userData": new FormGroup({
        "username": new FormControl(null, [Validators.required, this.forbiddenNamesValidator.bind(this)]),
        "email": new FormControl(null, [Validators.required, Validators.email])
      }),
      "gender": new FormControl("male"),
      "hobbies": new FormArray([])
    });
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  onAddHobby() {
    const newHobby = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get("hobbies")).push(newHobby);
  }

  forbiddenNamesValidator(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { 'nameIsForbidden': true };
    }

    return null;
  }
}
