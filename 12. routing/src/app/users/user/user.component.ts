import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  paramsSubscription: Subscription;
  user: {id: number, name: string};

  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    // note: Snapshot is activated only at the first appeareance of the component (first init)
    let id = this.activeRoute.snapshot.params["id"];
    let name = this.activeRoute.snapshot.params["name"];
    this.user = { id: id, name: name};

    // the proper way => subscribe to params change (will execute at each change)
    this.paramsSubscription = this.activeRoute.params.subscribe((newParams: Params) => {
        this.user.id = newParams.id;
        this.user.name = newParams.name;
    });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe(); // subscriptions remain in memory if not unsubscribed, because they are external
  }
}
