import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as shoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  igChangedSubscription: Subscription;
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  constructor(private store: Store<fromShoppingList.AppStateModel>) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList'); // returns observable with the 'shoppingList' object from state
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.igChangedSubscription = this.shoppingListService.ingredientAdded
    //     .subscribe((ingredients: Ingredient[]) => this.ingredients = ingredients);
  }

  onEditItem(i: number) {
    this.store.dispatch(new shoppingListActions.StartEditAction(i));
  }

  ngOnDestroy(): void {
    this.igChangedSubscription.unsubscribe();
  }
}
