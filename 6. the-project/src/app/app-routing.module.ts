import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: "full" // '' is part of all paths; this makes it redirect only when on home
  },
  {
    path: 'recipes',
    loadChildren: './recipes/recipes.module#RecipesModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
