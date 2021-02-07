import { Routes, RouterModule } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list.component";
import { NgModule } from "@angular/core";

const appRoutes: Routes = [
  {
    path: '',
    component: ShoppingListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class ShoppingListRoutingModule {

}
