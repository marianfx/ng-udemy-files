import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { AppStateModel } from './store/shopping-list.reducer';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  igChangedSubscription: Subscription;
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  constructor(private shoppingListService: ShoppingListService,
    private store: Store<AppStateModel>) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList'); // returns observable with the 'shoppingList' object from state
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.igChangedSubscription = this.shoppingListService.ingredientAdded
    //     .subscribe((ingredients: Ingredient[]) => this.ingredients = ingredients);
  }

  onEditItem(i: number) {
    this.shoppingListService.startedEditing.next(i);
  }

  ngOnDestroy(): void {
    this.igChangedSubscription.unsubscribe();
  }
}
