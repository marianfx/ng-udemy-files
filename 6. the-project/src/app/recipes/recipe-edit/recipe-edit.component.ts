import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Recipe } from '../recipe.model';
import * as fromApp from "../../store/app.reducer";
import * as recipeActions from "../store/recipe.actions";
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;
  storeSub: Subscription;

  get ingredientControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppStateModel>) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = +params["id"];
      this.editMode = params["id"];
      this.initForm();
    });
  }

  initForm() {
    let recipeName = "";
    let recipeImagePath = "";
    let recipeDesc = "";
    let ingredients = new FormArray([]);
    if (this.editMode) {

      this.storeSub = this.store.select("recipe").subscribe(state => {
        let recipe = state.recipes.find((rr, index) => {
          return index === this.id;
        });

        recipeName = recipe.name;
        recipeDesc = recipe.description;
        recipeImagePath = recipe.imagePath;
        if (recipe.ingredients) {
          recipe.ingredients.forEach(element => {
            ingredients.push(new FormGroup({
              "name": new FormControl(element.name, Validators.required),
              "amount": new FormControl(element.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            }));
          });
        }

        this.recipeForm = new FormGroup({
          "name": new FormControl(recipeName, Validators.required),
          "imagePath": new FormControl(recipeImagePath, Validators.required),
          "description": new FormControl(recipeDesc, Validators.required),
          "ingredients": ingredients
        });
      });
    }
  }

  onAddIngredient() {
    let formCtrl = <FormArray>this.recipeForm.get('ingredients');
    formCtrl.push(new FormGroup({
      "name": new FormControl(null, Validators.required),
      "amount": new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }

  onDeleteIngredient(i: number) {
    let formCtrl = <FormArray>this.recipeForm.get('ingredients');
    formCtrl.removeAt(i);
  }

  onSubmit() {
    var theRecipe = new Recipe(this.recipeForm.value["name"],
    this.recipeForm.value["description"],
    this.recipeForm.value["imagePath"],
    this.recipeForm.value["ingredients"]);

    if (this.editMode) {
      this.store.dispatch(new recipeActions.UpdateRecipeAction({
        index: this.id,
        recipe: theRecipe
      }));
    } else {
      this.store.dispatch(new recipeActions.AddRecipeAction(theRecipe));
    }

    // also navigate away
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
