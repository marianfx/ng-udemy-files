import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CanComponentDeactivate } from './can-deactivate-guard.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  allowEdit = true;
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  changesSaved: boolean = false;

  constructor(private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams) => {
      let allowEdit = +queryParams['allowEdit'];
      this.allowEdit = allowEdit === 1;
    });
    this.route.fragment.subscribe((fragment) => {
      console.log(fragment);
    });

    this.route.params.subscribe((params) => {
      this.server = this.serversService.getServer(+params["id"]);
      this.serverName = this.server.name;
      this.serverStatus = this.server.status;
    });
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], { relativeTo: this.route });
  }


  canDeactivate(): Observable<boolean> {
    if(!this.allowEdit)
      return Observable.of(true);

      // edits were made, but not saved
      console.log("", this.serverName, this.server.name);
    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved) {
      var yes = confirm("Do you want to discard your changes?");
      return Observable.of(yes);
    }

    return Observable.of(true);
  }

}
