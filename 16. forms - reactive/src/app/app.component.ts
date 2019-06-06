import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

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
        "email": new FormControl(null, [Validators.required, Validators.email], [this.forbiddenEmails.bind(this)])
      }),
      "gender": new FormControl("male"),
      "hobbies": new FormArray([])
    });

    // subscribe to value change
    this.signupForm.valueChanges.subscribe((newVal) => {
      console.log(newVal); // prints just the form, at each input
    });

    // subscribe to state change
    this.signupForm.statusChanges.subscribe((newStatus) => {
      console.log(newStatus); // prints just the form, at each input
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

  forbiddenEmails(control: FormControl): Observable<any> {
    const theObserver = Observable.create((observer: Observer<any>) => {
      setTimeout(() => {
        if (control.value === "test@test.com") {
          observer.next({"emailIsForbidden": true});
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1500);
    });

    return theObserver;
  }
}
