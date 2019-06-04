import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  allowEdit = true;
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';

  constructor(private serversService: ServersService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams) => {
      let allowEdit = +queryParams['allowEdit'];
      this.allowEdit = allowEdit === 1;
    });
    this.route.fragment.subscribe((fragment) => {
      console.log(fragment);
    });

    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

}
