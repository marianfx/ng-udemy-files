import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  allowEdit = true;
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    // this.route.params.subscribe((params) => {
    //   let theId = +params["id"]; // convert to number
    //   this.server = this.serversService.getServer(theId);
    // });

    // this would make the Edit button dissapear at all; but we practice to pass on params
    // this.route.queryParams.subscribe((queryParams) => {
    //   let allowEdit = +queryParams['allowEdit'];
    //   this.allowEdit = allowEdit === 1;
    // });

    this.route.data.subscribe((data) => {
      this.server = data["server"]; // the name from route definition
    });
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route, queryParamsHandling: "preserve"});
  }
}
