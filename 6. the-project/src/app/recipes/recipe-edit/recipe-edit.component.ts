import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;

  get ingredientControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

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
      let recipe = this.recipeService.getRecipe(this.id);
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
    }

    this.recipeForm = new FormGroup({
      "name": new FormControl(recipeName, Validators.required),
      "imagePath": new FormControl(recipeImagePath, Validators.required),
      "description": new FormControl(recipeDesc, Validators.required),
      "ingredients": ingredients
    });
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

    if (this.editMode)
      this.recipeService.updateRecipe(this.id, theRecipe);
    else
      this.recipeService.addRecipe(theRecipe);

    // also navigate away
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }
}
