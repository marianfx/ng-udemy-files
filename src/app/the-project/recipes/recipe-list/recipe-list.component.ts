import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import * as fromApp from "../../store/app.reducer";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipeSubscription: Subscription;
  recipes: Recipe[] = [];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppStateModel>) { }

  ngOnInit() {
    this.recipeSubscription = this.store.select("recipe").subscribe(x => this.recipes = x.recipes);
  }

  onNewRecipe() {
    this.router.navigate(["new"], { relativeTo: this.route});
  }

  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
  }
}
