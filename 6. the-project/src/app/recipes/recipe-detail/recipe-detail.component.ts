import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from "../../store/app.reducer";
import * as recipeActions from "../store/recipe.actions";
import * as shoppingListActions from "../../shopping-list/store/shopping-list.actions";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  id: number;
  recipe: Recipe;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppStateModel>) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = +params["id"];
      this.store.select("recipe").subscribe(state => {
        this.recipe = state.recipes.find((recipe, index) => {
          return index === this.id;
        });
      });
    });
  }

  onAddToShoppingList() {
    this.store.dispatch(new shoppingListActions.AddIngredientsAction(this.recipe.ingredients));
  }

  onEditRecipe() {
    this.router.navigate([this.id, 'edit'], { relativeTo: this.route.parent});
    // equivalent: this.router.navigate(['edit'], { relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.store.dispatch(new recipeActions.DeleteRecipeAction(this.id));
    this.router.navigate(['/recipes']);
  }
}
