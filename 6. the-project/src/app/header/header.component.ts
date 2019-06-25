import { Component } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent {

  constructor(private storage: DataStorageService) {}

  onSaveData() {
    this.storage.saveRecipes();
  }

  onFetchData() {
    this.storage.fetchData().subscribe();
  }
}
