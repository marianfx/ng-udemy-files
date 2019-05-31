import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe("Pizza Carnivora", "This is the best worst pizza", "https://food-images.files.bbci.co.uk/food/recipes/alpine_pizza_32132_16x9.jpg"),
    new Recipe("Pasta Bolognese", "Normal pasta", "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/spaghetti-bolognese_2.jpg"),
  ];

  @Output() onRecipeItemSelected = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected(recipe: Recipe) {
    this.onRecipeItemSelected.emit(recipe);
  }

}
