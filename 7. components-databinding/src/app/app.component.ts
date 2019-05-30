import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  serverElements = [ { type: "server", name: "Test server", content: "Just a test"}];

  /**
   * This is the event that is triggered by outside AFTER a server has been created
   * The binding happens in HTML
   * @param {{ serverName: string, serverContent: string }} serverData
   * @memberof AppComponent
   */
  onServerAdded(serverData: { serverName: string, serverContent: string }) {
    this.serverElements.push({
      type: "server",
      name: serverData.serverName,
      content: serverData.serverContent
    });
  }

  /**
   * This is the event that is triggered by outside AFTER a server has been created
   * The binding happens in HTML
   * @param {{ blueprintName: string, blueprintContent: string }} blueprintData
   * @memberof AppComponent
   */
  onBlueprintAdded(blueprintData: { blueprintName: string, blueprintContent: string }) {
    this.serverElements.push({
      type: "blueprint",
      name: blueprintData.blueprintName,
      content: blueprintData.blueprintContent
    });
  }
}
