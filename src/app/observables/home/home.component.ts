import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription, Observable, Observer } from 'rxjs';
// import { interval } from 'rxjs/observable/interval';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;

  constructor() {
  }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // });
    const customIntervalObservable = Observable.create((observer: Observer<number>) => {
      let count = 0;
      setInterval(() => {
        observer.next(++count);

        // custom complete => STOP
        // if (count === 2) {
        //   observer.complete();
        // }

        // custom error
        if (count > 3) {
          observer.error(new Error("Count is bigger than the maximum"));
        }
      }, 1000);
    });

    // PIPE + FILTER (filters out some results)
    let filteredObservable = customIntervalObservable.pipe(filter((data: number) => {
      return data > 1;
    }));

    // PIPE + MAP (maps result under another form)
    let pipedObservable = filteredObservable.pipe(map((data: number) => {
      return "Round: " + (data + 1);
    }));

    // .subscribe(onData(data), onError(error), onCompleted());
    this.firstObsSubscription = pipedObservable.subscribe(count => {
      console.log(count);
    }, error => {
      if (error)
        console.log("Had some error, sorry", error);
    }, () => {
      console.log("Completed!"); // does not trigger on error
    });
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }

}
