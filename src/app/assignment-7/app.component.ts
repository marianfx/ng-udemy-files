import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Component({
  selector: 'app-assignment-7',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  statuses: { id: number, value: string }[] = [
    { id: 1, value: "Stable" },
    { id: 2, value: "Critical" },
    { id: 3, value: "Finished" },
  ];
  defaultStatus = this.statuses[0].id;

  isSubmitted = false;
  theForm: FormGroup;
  getKeys = Object.keys;

  ngOnInit(): void {
    this.theForm = new FormGroup({
      "projectName": new FormControl(null, [Validators.required, this.forbiddenNameValidator], [this.forbiddenNameValidatorAsync]),
      "mail": new FormControl(null, [Validators.required, Validators.email]),
      "status": new FormControl(this.defaultStatus)
    });
  }

  forbiddenNameValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value === "Test") {
      return { "forbiddenNameError": true };
    }

    return null;
  }


  forbiddenNameValidatorAsync(control: FormControl): Observable<any> {
    const theObserver = Observable.create((observer: Observer<any>) => {
      setTimeout(() => {
        if (control.value === "Test2") {
          observer.next({"forbiddenNameError": true});
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });

    return theObserver;
  }

  onSubmit() {
    console.log(this.theForm.value);
    this.isSubmitted = true;
  }
}
